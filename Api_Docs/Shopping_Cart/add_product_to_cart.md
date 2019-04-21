# Add an item to Cart

add item into the Shopping Cart of a specific User

**URL** : `/api/cart`

**Method** : `POST`

**Auth required** : YES

## Success Response

**Code** : `201 Created`

**Content example**

```json
{
    "_id": "5cb657a2be9a8d02b45c0836",            
    "quantity": 2,
    "price": 99,
    "discount": 32
}
```

## Failure Responses


**Code** : `500 Internal Server Error`

```json 
{
    "code": 500,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/cart",
    "method": "POST",
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
    "method": "POST",
    "message": "Unauthorized Access"
}
```