# Mongoose Express Basic CRUD Project

## Overview

This project allows one to do basic CRUD operation with the created API endpoints. And it uses Node.js, Express, TypeScript, MongoDB, Mongoose, Zod, etc. for its development. Modular architecture, schema validation, and error handling are some of the key features of this application. Moreover, it uses linting tools like ESLint and Prettier, dotenv to handle environment variables, and bcrypt to hash user password, which have taken the standard of this project to an industry level.

## Project Link

[Project LIVE LINK]()

## API Testing

To test the API of this project, you can visit [Postman](https://www.postman.com/) and sign in or sign up. Then create a workspace and a blank collection. Then select add request from the collection menu and paste the project live link () to the URL. You can choose the HTTP methods from the dropdown on the left. And you can click on the Body and then choose raw and select JSON to pass request body for POST/PUT requests. That's it, you're good to go!

## API Endpoints

`**User Data**`

**Create a new user in Database**

Endpoint: `POST` /api/users

Request Body:

```json
{
  "userId": "number",
  "username": "string",
  "password": "string",
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "age": "number",
  "email": "string",
  "isActive": "boolean",
  "hobbies": ["string", "string"],
  "address": {
    "street": "string",
    "city": "string",
    "country": "string"
  }
}
```

**Get users data from Database**

Endpoint: `GET` /api/users

**Get user data from Database**

Endpoint: `GET` /api/users/:userId

**Update user data in Database**

Endpoint: `PUT` /api/users/:userId

Request Body:

```json
{
  "userId": "number",
  "username": "string",
  "password": "string",
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "age": "number",
  "email": "string",
  "isActive": "boolean",
  "hobbies": ["string", "string"],
  "address": {
    "street": "string",
    "city": "string",
    "country": "string"
  }
}
```

**Delete user data from Database**

Endpoint: `DELETE` /api/users/:userId

`**Order Data**`

**Update orders data of an user in Database**

Endpoint: `PUT` /api/users/:userId/orders

Request Body:

```json
{
  "productName": "string",
  "price": "number",
  "quantity": "number"
}
```

**Get orders data of an user from Database**

Endpoint: `GET` /api/users/:userId/orders

**Get total price of the orders of an user from Database**

Endpoint: `GET` /api/users/:userId/orders/total-price
