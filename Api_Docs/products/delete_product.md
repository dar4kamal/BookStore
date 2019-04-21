# Delete Product 

Delete a Single product with a specific id

**URL** : `/api/products/:id`

**Method** : `DELETE`

**Auth required** : YES


## Success Response

**Code** : `200 OK`


## Failure Responses


**Code** : `500 Internal Server Error`

```json 
{
    "code": 500,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/products/:id",
    "method": "PATCH",
    "message": "Internal Server Error"
}
```

                                    OR 

**Code** : `404 Not Found`

```json 
{
    "code": 404,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/products/:id",
    "method": "PATCH",
    "message": "Product Not Found"
}
```