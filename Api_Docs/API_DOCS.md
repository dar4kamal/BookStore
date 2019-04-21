# RestAPI Docs 

## Open Endpoints

Open endpoints require no Authentication.

* [Show a single Product](Api_Docs/products/get_single_product.md) : `GET /api/products/:id`
* [Show Products](Api_Docs/products/show_products.md) : `GET /api/products/`
* [Add User](Api_Docs/users/add_user.md) : `POST /api/users/`
* [Auth](Api_Docs/auth/auth.md) : `POST /api/auth/`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request.<br> A Token can be acquired from the Auth view above.

**Shopping Cart related**

Endpoints for viewing and manipulating the item contained in the Shopping Cart of a Specific User

* [Get Cart Items](Api_Docs/Shopping_Cart/get_cart_items.md) : `GET /api/cart/`
* [Add item to Cart](Api_Docs/Shopping_Cart/add_product_to_cart.md) : `POST /api/cart/`

**Users related**

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Show Users info](Api_Docs/users/show_users.md) : `GET /api/users/`
* [Update info](Api_Docs/users/update_user.md) : `PATCH /api/users/:id`

**Product related**

Endpoints for viewing and manipulating the Products by th Admin

* [Create product](Api_Docs/products/create_product.md) : `POST /api/products/`
* [Delete product](Api_Docs/products/delete_product.md) : `DELETE /api/products/:id`
* [Replace product Info](Api_Docs/products/replace_product.md) : `PUT /api/products/:id`
* [Update product Info](Api_Docs/products/update_product.md) : `PATCH /api/products/:id`

