# Finance Tracking System Backend

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Error Handling](#error-handling)

## Overview
The Finance Tracking System Backend is a Node.js application built with Express.js that provides APIs for managing user authentication, transactions, categories, budgets, and reports in a finance management system.

## Features
- User registration and authentication
- CRUD operations for transactions, categories, and budgets
- Monthly financial reports
- Middleware for authentication
- CORS enabled
- Currency conversion

## Installation
To install and run this application, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/finance-management-system-backend.git
    ```

2. Navigate to the project directory:
    ```sh
    cd finance-management-system-backend
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

## Configuration
Create a `.env` file in the root directory of the project and add the following environment variables:
```
PORT=4500
```

## Usage
To start the server, run the following command:
```sh
npm run server
```
The server will start on the port specified in the `.env` file (default is 3000).

## API Endpoints
### Public Routes
- **Home Route**
  - `GET /`
  - Returns a welcome message.

- **User Routes**
  - `POST /api/user/register_user`
    - Registers a new user.
  - `POST /api/user/login`
    - Authenticates a user and returns a token.

### Protected Routes
These routes require the `AuthenticationMiddleware` to be accessed.

- **Transaction Routes**
  - `POST /api/transactions/new_transaction`
    - Creates a new transaction with feature of currency conversion.
  - `GET /api/transactions/get_transaction`
    - Retrieves all transactions data.
    
- **Category Routes**
  - `POST /api/category/new_category`
    - Creates a new category.
  - `GET /api/category/all_categories`
    - Retrieves all categories.

- **Budget Routes**
  - `POST /api/budget/add_budget`
    - Creates a new budget.
  - `GET /api/budget/all_budget`
    - Retrieves all budgets.
  - `PUT /api/budget/:id`
    - Updates a budget by ID.
  - `DELETE /api/budget/:id`
    - Deletes a budget by ID.

- **Report Routes**
  - `GET /api/report/get_report/:month/:year`
    - Retrieves a monthly financial report for the specified month and year.

## Middleware
### AuthenticationMiddleware
This middleware is used to protect routes that require user authentication. It verifies the user's token and allows access to the protected routes if the token is valid.

## Error Handling
- **404 Route Handler**
  - Any request to an undefined route will return a 404 status with a message indicating that the route does not exist.
  - `app.all("*", (req, res) => { res.status(404).send({ message: "The Route you are searching for does not exist", result: false }) });`
