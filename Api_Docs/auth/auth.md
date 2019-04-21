# Auth

make user to login into the system 

**URL** : `/api/auth`

**Method** : `POST`

**Body** : 
```json
{
    "username": "",
    "email": "",
    "password" : ""    
}
```

## Success Response

**Code** : `201 Created`

**Content example**

```json
{
    "_id": "5cb657a2be9a8d02b45c0836",
    "username": "ahmed",
    "email": "",            
}
```

## Failure Responses

**Code** : `401 Unauthorized`

```json 
{
    "code": 401,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/auth",
    "method": "POST",
    "message": "Invalid username and password!"
}
``` 

                                    OR 

**Code** : `500 Internal Server Error`

```json 
{
    "code": 500,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/auth",
    "method": "POST",
    "message": "Internal Server Error"
}
```

                                    OR 

**Code** : `400 Bad Request`

```json 
{
    "code": 400,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/auth",
    "method": "POST",
    "message": "Invalid Body Format"
}
```