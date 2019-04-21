# Show Products

get all products details 

**URL** : `/api/products`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "data" : [
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
        },{
            "_id": "5cb657a2be9a8d02b45c0837",
            "title": "The Hunger Games (The Hunger Games, #2)",
            "original_title": "The Hunger Games",
            "isbn": 439023463,
            "editions_count": 192,
            "authors": "Suzanne Collins",
            "original_publication": 2012.0,
            "language_code": "eng",
            "rating": 4.34,
            "rating_count": 47806647,
            "image_url": "https://images.gr-assets.com/books/1447303603m 2768552.jpg",
            "quantity": 10,
            "price": 229,
            "discount": 1
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
    "path": "/api/products",
    "method": "GET",
    "message": "Internal Server Error"
}
```