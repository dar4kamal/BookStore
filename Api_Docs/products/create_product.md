# Create Products

Add a Single product into the database 

**URL** : `/api/products`

**Method** : `POST`

**Auth required** : YES

**Body** :
```json
{
    "title": "",
    "original_title": "",
    "isbn": 0,
    "editions_count": 0,
    "authors": "",
    "original_publication": 0,
    "language_code": "",
    "rating": 0,
    "rating_count": 0,
    "image_url": "",
    "quantity": 0,
    "price": 0,
    "discount": 0
}
```

## Success Response

**Code** : `201 Created`

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
    "path": "/api/products",
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
    "path": "/api/products",
    "method": "POST",
    "message": "Invalid Body Format"
}
```
