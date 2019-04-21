* [Update info](user/put.md) : `PUT /api/users/:id`


# Update User Info 

**URL** : `/api/users/:id`

**Method** : `PATCH`

**Body** : 
```json
{
    "username" : "",
    "email" : "",
    "password" : "",
    "role" : ""
}
```

## Success Response

**Code** : `201 Created`

**Content example**

```json
{
    "_id": "5cb657a2be9a8d02b45c0836",
    "username": "ahmed",
    "email": "ahmed9656@example.com"    
}
```

## Failure Responses

**Code** : `400 Bad Request`

**Content example**
```json 
{
    "code": 400,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/users/:id",
    "method": "PATCH",
    "message": "username already exists, please choose an other one"
}
```
                                    OR 

**Code** : `500 Internal Server Error`

**Content example**
```json 
{
    "code": 500,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/users/:id",
    "method": "PATCH",
    "message": "Internal Server Error"
}
```

                                    OR 

**Code** : `404 Not Found`

**Content example**
```json 
{
    "code": 404,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/users/:id",
    "method": "PATCH",
    "message": "User Not Found"
}
```