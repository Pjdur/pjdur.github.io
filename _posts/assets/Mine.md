# Mine

A simple programming language.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)

## Introduction
Mine is a simple programming language designed to be easy to learn and use. It is suitable for beginners who want to get started with programming, as well as for experienced developers looking for a lightweight language for scripting and quick development tasks.

## Features
- Easy to learn syntax
- Lightweight and fast
- Cross-platform compatibility

## Installation
To install Mine, follow these steps:

### Build from source

1. Clone the repository:
    ```bash
    git clone https://github.com/Pjdur/Mine.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Mine
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```
4. Build Mine:
    ```bash
    npm run build
    ```

## Usage
To use Mine, you can run the interpreter with the following command:

```bash
node mine.js <your-script.mine>
```
Replace <your-script.mine> with the path to your Mine script.

> Mine can run with any file, regardless of filename, as long as it follows the syntax. But the two main file types are `.mn` and `.mine`

# Mine Interpreter

The Mine Interpreter is a simple scripting language interpreter implemented in JavaScript. It supports basic operations such as variable assignment, printing, conditional statements, and loops.

## Features

- Variable assignment
- Print statements
- Conditional statements (`if`)
- Loops (`while`)

## Usage

### Running the Interpreter

To run the interpreter from the command line, use the following command:

```sh
mine <file-name>
```

Replace `<file-name>` with the path to your Mine script file.

### Example

Create a file named `test.mine` with the following content:

```plaintext
x = 10
y = 20
print(x + y)

if (x < y) {
    print("x is less than y")
}

while (x < 15) {
    print(x)
    x = x + 1
}
```

Run the interpreter with the `test.mine` file:

```sh
mine test.mine
```

### Output

The output of the above script will be:

```
30
x is less than y
10
11
12
13
14
```

# Examples
Here are some examples of how to use Mine:

**Hello World**

```mine
print("Hello, World!")
```

**Simple Addition**
```mine
let result = 5 + 3
print(result)
```

