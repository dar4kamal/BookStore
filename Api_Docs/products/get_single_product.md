# Show Product 

show a Single product with a specific id

**URL** : `/api/products/:id`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "_id": "5cb657a2be9a8d02b45c0836",
    "title": "The Hunger Games (The Hunger Games, #1)",
    "original_title": "The Hunger Games",
    "isbn": 439023483,
    "editions_count": 272,
    "authors": "Suzanne Collins",
    "original_publication": 2008.0,
    "language_code": "eng",
    "rating": 4.34,
    "rating_count": 4780653,
    "image_url": "https://images.gr-assets.com/books/1447303603m 2767052.jpg",
    "quantity": 10,
    "price": 129,
    "discount": 12
}
```

## Failure Responses


**Code** : `500 Internal Server Error`

```json 
{
    "code": 500,
    "timeStamp": "4/20/2019, 4:28:57 PM",
    "path": "/api/products/:id",
    "method": "GET",
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
    "method": "GET",
    "message": "Product Not Found"
}
```
