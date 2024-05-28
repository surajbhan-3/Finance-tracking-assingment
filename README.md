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

### User Registration API

This API allows you to register a new user by sending a POST request with the necessary user details. 

### Endpoint

### POST `/api/user/register_user`

This endpoint registers a new user with the provided details.

### Request

### URL
`http://localhost:4500/api/user/register_user`

### Method
`POST`

### Headers
Ensure that you include the appropriate headers for your request:
- `Content-Type: application/json`

### Request Body
The JSON body should include the following fields:
- `firstName`: (string) The first name of the user.
- `lastName`: (string) The last name of the user.
- `email`: (string) The email address of the user.
- `password`: (string) The password for the user account.

#### Example
```json
{
    "firstName": "firstUser",
    "lastName": "lastUser",
    "email": "user11@gmail.com",
    "password": "12345"
}
```

## Response

### Success Response

#### Status Code
`200 OK`

#### Response Body
The JSON response body includes:
- `data`: An object containing the details of the newly registered user.
- `message`: A confirmation message indicating the user has been registered.
- `result`: A boolean indicating the success of the operation.

#### Example
```json
{
    "data": {
        "id": 3,
        "firstName": "firstUser",
        "lastName": "lastUser",
        "email": "user11@gmail.com",
        "password": "$2b$08$bRYAaADyGePYLFb5kQFwl.PlIj6ybu3MW0n.YxbiMKYrBpUwEGg7m",
        "created_at": "2024-05-28T07:49:22.658Z"
    },
    "message": "User has been registered",
    "result": true
}
```



### User Login Endpoint

**URL:** `http://localhost:4500/api/user/login`  
**Method:** `POST`  
**Content-Type:** `application/json`

### Request

#### Input JSON
```json
{
    "email": "user11@gmail.com",
    "password": "12345"
}
```

### Response

#### Success
```json
{
    "message": "User logged in successfully",
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoidXNlcjExQGdtYWlsLmNvbSIsImlhdCI6MTcxNjg4MjgzMCwiZXhwIjoxNzE3NDg3NjMwfQ.Oh0POeHaW413as4No_YM0e2LC4-69tM5zf3ycIiCsU4"
}
``

#### Response
```json
{
    "message": "User logged in successfully",
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoidXNlcjExQGdtYWlsLmNvbSIsImlhdCI6MTcxNjg4MjgzMCwiZXhwIjoxNzE3NDg3NjMwfQ.Oh0POeHaW413as4No_YM0e2LC4-69tM5zf3ycIiCsU4"
}

```




### Protected Routes
These routes require the `AuthenticationMiddleware` to be accessed.

- **Transaction Routes**
  - `POST /api/transactions/new_transaction`
    - Creates a new transaction with feature of currency conversion.
     #### Input JSON
```json
{
   
   "amount":"4400",
   "description":"The above amount is in rupees",
   "categoryId":3,
   "fromCurrency":"INR",
   "toCurrency":"USD"
  
    
}

```
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

 ```json
{
   
        "amount": 65600,
        "startDate":"06-6-2024",
        "endDate":"06-7-2024",
        "fromCurrency":"INR",
        "toCurrency":"USD"
       
}

```   
   
  - `GET /api/budget/all_budget`
    - Retrieves all budgets.
  - `PUT /api/budget/:id`
    - Updates a budget by ID.
  - `DELETE /api/budget/:id`
    - Deletes a budget by ID.

- **Report Routes**
  - `GET /api/report/get_report/:month/:year`
    - /api/report/get_report/5/2024
    - Retrieves a monthly financial report for the specified month and year.
    


## Middleware
### AuthenticationMiddleware
This middleware is used to protect routes that require user authentication. It verifies the user's token and allows access to the protected routes if the token is valid.

## Error Handling
- **404 Route Handler**
  - Any request to an undefined route will return a 404 status with a message indicating that the route does not exist.
  - `app.all("*", (req, res) => { res.status(404).send({ message: "The Route you are searching for does not exist", result: false }) });`
