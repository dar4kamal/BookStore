# Get Cart Items

Show items in the Shopping Cart of a specific User

**URL** : `/api/cart`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 Ok`

**Content example**

```json
{
    "data": [
        {
            "_id": "5cb657a2be9a8d02b45c0836",            
            "quantity": 2,
            "price": 159,
            "discount": 42
        },{
            "_id": "5cb657a2be9a8d02b45c0837",            
            "quantity": 1,
            "price": 219,
            "discount": 15
        }    
    ]
}
```

## Failure Responses


**Code** : `500 Internal Server Error`

```json 
{
    "code": 500,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/cart",
    "method": "GET",
    "message": "Internal Server Error"
}
```

                                    OR 

**Code** : `401 Unauthorized`

**Content example**
```json 
{
    "code": 401,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/cart",
    "method": "GET",
    "message": "Unauthorized Access"
}
```