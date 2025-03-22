import { codeToHtml } from 'https://esm.sh/shiki@3.0.0'

const code = `
import re

# Function to print error message template and then exit***
def error(message, line):
  print(f"\nError: {message} Line: {contents.splitlines().index(line) + 1}")
  exit()


# Function to get the length of the parser
def get_parser_length():
  if 'pl' not in variables:
    with open(__file__, "r") as file:
      lines = file.read().splitlines()
      variables['pl'] = len(lines) + 1
  return f"Parser length: {variables['pl']} lines."


# Function to return parts in quotes and parts seperated by spaces not in quotes
def re_split(string):
  parts = re.findall(r'["\'][^"\']*["\']|\S+', string)
  return parts


with open("main.cb", "r") as file:
  contents = file.read()
contents = contents.replace("   ", " ")
variables = {}

for line in contents.splitlines():
  parts = re_split(line)

  if line.startswith("getpl;"):
    print(get_parser_length())
  #*
  if line == "" or line.startswith("#") or line.startswith(" "):
    continue

  if parts[0] == 'print:':
    for part in parts:
      # Replace \n with newline
      part = part.replace(r'\n', "\n")

      # Skip the print: at the start
      if part == "print:":
        continue

      # If part starts with #, skip everything after it
      if part.startswith("#"):
        break

      if line.startswith("if") and part == "True" and line.endswith(":"):
        print(line.replace("if True: print: ", " "))

      # If has quotes (is a string)
      if part.startswith('"') and part.endswith('"') and part.count(
          '"') == 2 or part.startswith("'") and part.endswith(
              "'") and part.count("'") == 2:
        print(part[1:-1], end="")

      # If has quotes but doesn't satisfy previous condition
      elif part.count('"') > 0:
        error(
            "Unterminated string in print. Strings must start and end with a double quote character.",
            line)

      # If variable
      elif part in variables:
        print(variables[part], end="")

      # If not string then var. If var not in variables, var doesn't exist
      else:
        error(f"Variable \"{part}\" does not exist.", line)
    print()  # Create newline at end of print statement

  if line.startswith('var '):
    end = line.find('=')
    var_name = line[4:end - 1]

    # Check if var_name is alphanumeric characters
    

    # Check if var_name already exists
    if var_name in variables:
      error(f"Variable {var_name} already exists.", line)

    else:
      # Check if var_value is a prompt
      if line[line.index('=') + 2:line.index('=') + 9] == "prompt:":
        prompt = ""

        for part in parts:
          # Replace \n with newline
          part = part.replace(r'\n', "\n")

          # Skip the var = prompt: at the start
          if part == "var" or part == var_name or part == "=" or part == "prompt:":
            continue

          # If part starts with #, skip everything after it
          if part.startswith("#"):
            break

          # If string
          elif part.startswith('"') and part.endswith('"') and part.count(
              '"') == 2 or part.startswith("'") and part.endswith(
                  "'") and part.count("'") == 2:
            prompt += part[1:-1]

          # If quotes but doesn't satisfy previous condition
          elif part.count('"') > 0:
            error(
                "Unterminated string in variable assignement. Strings must start and end with a double quote character.",
                line)

          # If variable
          elif part in variables:
            prompt += variables[part]

          # If not string then var. If var not in variables, var doesn't exist
          else:
            error(f"Variable \"{part}\" does not exist.", line)
        var_value = input(prompt)

      # Else set var_value to whatever is after the =
      else:
        var_value = ""
        for part in parts:
          # Replace \n with newline
          part = part.replace(r'\n', "\n")

          # Skip the var = at the start
          if part == "var" or part == var_name or part == "=":
            continue

          # If part starts with #, skip everything after it
          if part.startswith("#"):
            break

          # If has quotes (is a string)
          elif part.startswith('"') and part.endswith('"') and part.count(
              '"') == 2 or part.startswith("'") and part.endswith(
                  "'") and part.count("'") == 2:
            var_value += part[1:-1]

          # If has quotes but doesn't satisfy previous condition
          elif part.count('"') > 0:
            error(
                "Unterminated string in variable assignement. Strings must start and end with a double quote character.",
                line)

          # If variable
          elif part in variables:
            var_value += variables[part]

          # If not string then var. If var not in variables, var doesn't exist
          else:
            error(f"Variable \"{part}\" does not exist.", line)
      variables[var_name] = var_value  # Add to variables
`

const quantum = document.getElementById('quantum')
quantum.innerHTML = await codeToHtml(`${code}`, {
    lang: 'python',
    theme: 'github-light'
})