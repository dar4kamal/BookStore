# Show Users 

Get details of all Users including Admin along with basic subscription information.

**URL** : `/api/users/`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "data" : [
        {
            "_id": "5cb657a2be9a8d02b45c0836",
            "first_name": "ahmed",
            "last_name": "ibrahim",
            "email": "ahmed9656@example.com",
            "role": "admin"
        },
        {
            "_id": "5cb657a2be9a8d02b45c0837",
            "first_name": "ali",
            "last_name": "muhammed",
            "email": "Ali546@example.com",
            "role": "user"
        }
    ]    
}
```

## Failure Response

**Code** : `401 Unauthorized`

**Content example**
```json 
{
    "code": 401,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/users",
    "method": "GET",
    "message": "Unauthorized Access: your role does not have the right privaliges"
}
```

                                    OR 

**Code** : `500 Internal Server Error`

**Content example**
```json 
{
    "code": 500,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/users",
    "method": "GET",
    "message": "Internal Server Error"
}
```