## APIs

---

> ### Signup User

- Route: `/api/v1/user/signup`
- Method: `POST`
- **Body:**

```json
{
  "email": "newUser@jotit.com",
  "password": "newUserPassword",
  "passwordConfirm": "newUserPassword",
  "name": "User 1"
}
```

- **Response:**

201 Success

```json
{
  "name": "User 1",
  "email": "newuser@jotit.com",
  "notes": [],
  "_id": "63f5d504977e9e634dbef800",
  "__v": 0
}
```

> ### Login User

- Route: `/api/v1/user/login`
- Method: `POST`
- **Body:**

```json
{
  "email": "newUser@jotit.com",
  "password": "newUserPassword"
}
```

- **Response:**

200 Success

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjVkNTA0OTc3ZTllNjM0ZGJlZjgwMCIsImVtYWlsIjoibmV3VXNlckBqb3RpdC5jb20iLCJpYXQiOjE2NzcwNTU1MzEsImV4cCI6MTY3NzA2MjczMX0.pu2704-Zk7CV0htk9FY_Hxvs3kURL4R34FFLZHcO4CU"
}
```

> ### Create Note

- Route: `/api/v1/note`
- Method: `POST`
- Header
  - Authorization: `Bearer {token}`
- **Body:**

```json
{
  "title": "New Beginnings",
  "content": "It's my birthday today and it is a new beginning for me"
}
```

- **Response:**

201 Success

```json
{
  "status": "success",
  "data": {
    "note": {
      "title": "New Beginnings",
      "content": "It's my birthday today and it is a new beginning for me",
      "owner": "63f5d504977e9e634dbef800",
      "_id": "63f5d762977e9e634dbef804",
      "createdAt": "2023-02-22T08:50:42.385Z",
      "__v": 0
    }
  }
}
```

> ### Get Note by note Id for Authenticated Users

- Route: `/api/v1/note/:id`
- Method: `GET`
- **Response:**

200 Success

```json
[
  {
    "status": "success",
    "data": {
      "note": {
        "_id": "63f5d762977e9e634dbef804",
        "title": "New Beginnings",
        "content": "It's my birthday today and it is a new beginning for me",
        "owner": {
          "_id": "63f5d504977e9e634dbef800",
          "name": "User 1"
        },
        "createdAt": "2023-02-22T08:50:42.385Z",
        "__v": 0
      }
    }
  }
]
```

> ### Get all notes for Authenticated Users

- Route: `/api/v1/note/`
- Method: `GET`
- Query params:

  - page (default: 1) - `/api/v1/note?page=1`
  - per_page (default: 5) - `/api/v1/note?limit=5`

- **Response:**

200 Success

```json
{
  "status": "success",
  "results": 2,
  "data": {
    "notes": [
      {
        "_id": "63f5dbe8977e9e634dbef813",
        "title": "A new note",
        "content": "It's my birthday today and it is a new beginning for me",
        "owner": {
          "_id": "63f5d504977e9e634dbef800",
          "name": "User 1"
        },
        "createdAt": "2023-02-22T09:10:00.632Z",
        "__v": 0
      },
      {
        "_id": "63f5d762977e9e634dbef804",
        "title": "New Beginnings",
        "content": "It's my birthday today and it is a new beginning for me",
        "owner": {
          "_id": "63f5d504977e9e634dbef800",
          "name": "User 1"
        },
        "createdAt": "2023-02-22T08:50:42.385Z",
        "__v": 0
      }
    ]
  }
}
```

> ### Update blog by Authenticated and Authorised User

- Route: `/api/v1/note/:id`
- Method: `PATCH`
- Header
  - Authorization: `Bearer {token}`
- **Body:**

```json
{
  "title": "A new title"
}
```

- **Response:**

204 No Content

```json
{}
```

> ### Delete blog by Authenticated and Authorised User

- Route: `/api/v1/note/:id`
- Method: `DELETE`
- Header

  - Authorization: `Bearer {token}`

- **Response:**

204 No Content

```json
{}
```

---
