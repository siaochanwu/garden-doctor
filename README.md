# Garden Doctor

Garden Doctor is a web application designed to help users diagnose and treat plant problems. Whether you're a novice gardener or an experienced horticulturist, Garden Doctor provides easy-to-use tools and information to keep your garden healthy and thriving.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [License](#license)

## Features

- **Plant Diagnosis:** Identify plant diseases based on symptoms and photos.
- **Treatment Suggestions:** Get recommendations for treating diagnosed plant problems.
- **Plant Care Tips:** Access a library of tips for maintaining healthy plants.
- **User Accounts:** Create an account to save your garden's plants and track their health.

## Technologies Used

- **Backend:** Node.js, Express, Sequelize (with MySQL)
- **Testing:** Jest
- **Documentation:** Swagger
- **Containerization:** Docker

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/siaochanwu/garden-doctor.git
   cd garden-doctor
   ```

2. **Installation:**
   ```bash
   npm install
   ```
3. **Set up the MySQL database and configure the connection in a .env file:**
   ```bash
   NODE_ENV=
   PORT=
   DB_NAME=
   DB_USER=
   DB_HOST=
   DB_PASSWORD=
   #test
   TEST_DB_NAME=
   TEST_DB_USER=
   TEST_DB_HOST=
   TEST_DB_PASSWORD=
   #Email
   CLIENT_ID=
   CLIENT_SECRET=
   REDIRECT_URI=
   EMAIL_SERVICE_USER=
   EMAIL_SERVICE_PASSWORD=
   ```
4. **Start the server:**
   ```bash
   npm start
   ```

## Usage

Once the server is running, you can access the web application at http://localhost:3000. You can also view the Swagger documentation at http://localhost:3000/api-docs.

## API Endpoints

### Register

- Endpoint: `/users/register`
- Method: POST
- Request Body:
  - username(string, required): user name
  - password(string, required): user password
  - email(string, required): user email

### Login

- Endpoint: `/users/login`
- Method: POST
- Request Body:
  - password(string, required): user password
  - email(string, required): user email
- Response:
  ```json
  { token: token }
  ```

### Forget Password

- Endpoint: `/users/forget-password`
- Method: POST
- Request Body:
  - email(string, required): user email
- Description: will receive a mail with a temporary password

### Reset Password

- Endpoint: `/users/reset-password`
- Method: POST
- Request Body:
  - password(string, required): new password
  - email(string, required): user email

### Logout

- Endpoint: `/users/logout`
- Method: POST
- Request Body:
  - email(string, required): user email

### Get All Posts

- Endpoint: `/posts/posts`
- Method: GET
- Response:
  ```json
  [
    {
      "id": "integer",
      "question": "string",
      "plantType": "string",
      "environment": "string",
      "userId": "integer",
      "createdAt": "datetime",
      "updatedAt": "datetime",
      "images": [
        {
          "id": "integer",
          "imageUrl": "string",
          "postId": "integer",
          "createdAt": "datetime",
          "updatedAt": "datetime"
        }
      ]
    }
  ]
  ```

### Get One post

- Endpoint: `/posts/posts/:id`
- Method: GET
- Parameter:
  - id(integer, required)
- Response:

  ```json
  {
    "id": "integer",
    "question": "string",
    "plantType": "string",
    "environment": "string",
    "userId": "integer",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "images": [
      {
        "id": "integer",
        "imageUrl": "string",
        "postId": "integer",
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    ]
  }
  ```

### Creat A New Post

- Endpoint: `/posts/post`
- Method: POST
- Header:
  - Authorization: `Bearer ${token}`
- Request Body(formData):
  - question(string, required): question
  - plantType(string, required): plantType
  - environment(string, required): environment
  - images(jpg/jpeg/png)

### Edit A New Post

- Endpoint: `/posts/posts/:id`
- Method: PUT
- Header:
  - Authorization: `Bearer ${token}`
- Parameter:
  - id(integer, required)
- Request Body(formData):
  - question(string, required): question
  - plantType(string, required): plantType
  - environment(string, required): environment
  - images(jpg/jpeg/png)

### Delete A New Post

- Endpoint: `/posts/posts/:id`
- Method: PUT
- Header:
  - Authorization: `Bearer ${token}`
- Parameter:
  - id(integer, required)

### Search Posts By Keyword

- Endpoint: `/posts/search`
- Method: POST
- Header:
  - Authorization: `Bearer ${token}`
- Request Body(formData):
  - keyword(string, required): keyword

### Create A Reply

- Endpoint: `/replies/reply`
- Method: POST
- Header:
  - Authorization: `Bearer ${token}`
- Request Body(formData):
  - postId(string, required): postId
  - text(string, required): text
  - images(jpg/jpeg/png)

### Get Replies Of A Post

- Endpoint: `/replies/replies/:postId`
- Method: GET
- Parameter:
  - postId(integer, required)
- Header:
  - Authorization: `Bearer ${token}`

### Edit A Reply

- Endpoint: `/replies/reply/:id`
- Method: PUT
- Header:
  - Authorization: `Bearer ${token}`
- Parameter:
  - id(integer, required): reply id
- Request Body(formData):
  - text(string, required): text
  - images(jpg/jpeg/png)

### Delete A Reply

- Endpoint: `/replies/reply/:id`
- Method: Delete
- Header:
  - Authorization: `Bearer ${token}`
- Parameter:
  - id(integer, required): reply id

### Search Replies By Keyword

- Endpoint: `/replies/posts/search`
- Method: POST
- Header:
  - Authorization: `Bearer ${token}`
- Request Body(formData):
  - keyword(string, required): keyword

## Database Schema

### Users

- id(integer): Primary key
- username(string)
- password(string)
- email(string)

### Posts

- id(integer): Primary key
- question(string)
- plantType(string)
- environment(string)

### Replies

- id(integer): Primary key
- text(string)
- postId(integer)

### PostImages

- id(integer): Primary key
- imageUrl(string)

### ReplyImages

- id(integer): Primary key
- imageUrl(string)

## Testing

To run the tests using Jest:

  ```bash
    npm test
  ```
## License
This project is licensed under the MIT License - see the LICENSE file for details.


