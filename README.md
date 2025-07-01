# <p align="center">Full-Stack Web Application</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
</p>

## Introduction

This project showcases a basic full-stack web application built with JavaScript, Node.js, and Express. It features user authentication, todo list management, and a simple calculator functionality, providing a foundation for learning and building more complex web applications. The application utilizes file-based data persistence for simplicity.

## Table of Contents

1.  [Key Features](#key-features)
2.  [Installation Guide](#installation-guide)
3.  [Usage](#usage)
4.  [Environment Variables](#environment-variables)
5.  [Project Structure](#project-structure)
6.  [Technologies Used](#technologies-used)
7.  [License](#license)

## Key Features

*   **User Authentication:** Sign-up, sign-in, and authentication token management.
*   **Todo List Management:** Add, delete, and retrieve todo items.
*   **Simple Calculator:** Basic arithmetic operations.
*   **File-based Data Storage:** Todo data is stored in a `todo.json` file.
*   **Express.js Backend:** RESTful API endpoints for all functionalities.
*   **Axios/Fetch Frontend:** Interacting with the backend API.

## Installation Guide

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Navigate to the backend directory (if applicable):**

    ```bash
    cd <backend_directory>
    ```
    for example
     ```bash
    cd day5/todo/back-end
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Create a `.env` file (if required) and configure environment variables:**

    See the [Environment Variables](#environment-variables) section for details.

5.  **Run the FastAPI server:**

    ```bash
    npm start
    ```
    or
     ```bash
    node index.js
    ```

## Usage

*   **Frontend:**  Open the `signin.html` or `signup.html` in your browser to access the user authentication pages.  After successful login, you will be redirected to the todo list dashboard. The `script.js` file handles interactions with the backend API.
*   **API Endpoints:** The backend provides the following endpoints:
    *   `POST /signUp`: Registers a new user.
    *   `POST /signIn`: Authenticates an existing user and returns an active token.
    *   `GET /todo-list`: Retrieves the todo list for the authenticated user.
    *   `POST /update-todo`: Adds a new todo item.
    *   `POST /delete-todo`: Deletes a todo item.
    *   `GET /eval?num1={number}&num2={number}&operation={+|-|*|/}`: Evaluates a simple expression.

## Environment Variables

This project relies on the following environment variables:

*   **No specific environment variables are required for this example.** However, in a real-world application, you would typically store sensitive information like database connection strings, API keys, and authentication secrets in environment variables.

## Project Structure

```
/tmp/repo_ukuzfese/
├── day1/
│   └── script.js
├── day2/
│   ├── index.js
│   ├── index2.js
│   ├── indexcallback.js
│   ├── exe.js
│   └── eve/
│       └── index.js
├── day3/
│   ├── http-server-starter/
│   │   └── index.js
│   └── full-stack-calculator/
│       ├── back-end/
│       │   └── index.js
│       └── front-end/
│           ├── scriptfetch.js
│           └── script.js
├── day4/
│   ├── maxcalc/
│   │   ├── back-end/
│   │   └── front-end/
│   └── todo/
│       ├── back-end/
│       │   └── index.js
│       └── front-end/
│           └── script.js
├── day5/
│   ├── signin/
│   │   ├── fe/
│   │   └── be/
│   └── tododbfile/
│       ├── back-end/
│       │   └── src/
│       └── front-end/
│   └── todo/
│       ├── back-end/
│       │   └── index.js
│       └── front-end/
│           └── script.js
└── day6/
    └── signintodo/
        └── be/
            └── index.js
```

## Technologies Used

<p align="left">
  <a href="#"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
</p>

*   **Backend:** Node.js, Express.js
*   **Frontend:** JavaScript, Axios/Fetch
*   **Data Storage:** File system (JSON file)
*   **Authentication:** Token-based (simple implementation)

## License

MIT License
