# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: 'http://localhost:3000/api/v1/products' [GET]
- Show: 'http://localhost:3000/api/v1/products/:id' [GET]
- Create [token required]: 'http://localhost:3000/api/v1/products' [POST]
- [OPTIONAL] Top 5 most popular products: 'http://localhost:3000/api/v1/products/filter/top5' [GET]
- [OPTIONAL] Products by category (args: product category): 'http://localhost:3000/api/v1/products/category/phone' [GET]

#### Users

- Index [token required]: 'http://localhost:3000/api/v1/users/auth' [GET]
- Show [token required]: 'http://localhost:3000/api/v1/users/auth/:userid' [GET]
- Create N[token required]: 'http://localhost:3000/api/v1/users/auth/add/user' [POST]

#### Orders

- Current Order by user (args: user id)[token required]: 'http://localhost:3000/api/v1/orders/active/:userid' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] 'http://localhost:3000/api/v1/orders/completed/:userid' [GET]

## Data Shapes

Product (id:varchar, name:varchar, price:number, category:varchar)
User (id:varchar, username:varchar, firstname:varchar, lastname:varchar, password: string)
Orders (id:varchar, quantity:varchar, user_id:string[foreign key to users table], product_id:string[foreign key to products table])
OrdersDetail(order_id:string[foreign key to orders table], product_id:string[foreign key to products table])


#### Product

- id
- name
- price
- [OPTIONAL] category


#### User

- id
- username
- firstname
- lastname
- password


#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)