# Nuxt Fake Store

A Nuxt 4 store with Prisma , Faker Js, Taiwind Css, NuxtUI and Pinia 

* [faker js](https://fakerjs.dev/guide/)
Used Faker JS to generate fake data for testing and development

* [Prisma](https://www.prisma.io/)
Prisma is used as an ORM to interact with the database

* [Tailwind CSS](https://tailwindcss.com/)
Tailwind CSS is used for styling the application
* [Nuxt UI](https://nuxtui.com/)
Nuxt UI is used for building user interfaces in the application
* [Pinia](https://pinia.vuejs.org/)
Pinia is used for state management in the application

## Getting Started
To get started with the Nuxt Fake Store, follow these steps:
1. Clone the repository:
   ```bash
   git clone
   cd nuxt-fake-store
   npm i
   npm run dev
    ```
## Build Docker Container 
```bash
 docker compose up --build 
 ```
## Start aplication 
```bash
docker compose up 
```

## Connect to db
## migrate
```bash 
npx prisma migrate deploy
```

## Commands to run Prisma:

- `npx prisma generate` 
generates the Prisma client based on the schema defined in `prisma/schema.prisma`.

- `prisma nuxt`
  generates the Nuxt module for Prisma, allowing you to use Prisma in your Nuxt application

- `npx prisma migrate reset`
 resets the database and applies all migrations from the beginning. It should apply only on development environments


- `npx prisma migrate dev --name change-id-to-uuid` detects changes in the schema and creates a new migration file

- `npx tsx prisma/seed.ts` seeds the database with a seeder file
- `npx prisma db seed ` 
seeds the database with a seeder file defined in `prisma/seed.ts`


## DB tables

- [**users**](#users)

- [**products** ](#products)

- [**variants**](#variants)

- [**products_images**](#products_images)

- [**reviews**](#reviews)

- [**orders**](#orders)

- [**orders_items**](#orders_items)

- [**addresses**](#addresses)

- [**brands**](#brands)

- [**categories**](#categories)

- [**wishlist**](#wishlist)

### _Users_
 it's a table that stores user information, including their name, email, password, and other details. It is used for authentication and user management in the application.
### _Products_
a table that stores product information, including the product name, description, price, and other details. It is used to display products in the application.
### _Products Variants_
variants are different versions of a product, such as different sizes or colors. This table stores information about the variants, including the variant name, price, and other details. It is used to manage product variations in the application.
### _Products Images_
each product can have multiple images associated with it. This table stores the image URLs and their corresponding product IDs. It is used to display product images in the application.
### _Reviews_
Reviews are user-generated feedback on products. This table stores the review content, rating, and the user who submitted the review. It is used to display product reviews in the application.
### _Orders_
orders are created when a user purchases products. This table stores order details, including the user ID, total amount, and order status. It is used to manage orders in the application.
### _Order Items_
it's a table that stores the individual items within an order. Each order can have multiple items, and this table links the order to the specific products purchased. It is used to manage the contents of each order in the application.
### _Addresses_
stores user addresses for shipping and billing purposes. This table includes details such as the user's name, address, city, state, and postal code. It is used to manage user addresses in the application.
### _Brands_
products can belong to different brands. This table stores brand information, including the brand name and description. It is used to categorize products by brand in the application.
### _Categories_
poducts can be organized into categories. This table stores category information, including the category name and description. It is used to categorize products in the application.
### _Wishlist_
users can create wishlists to save products they are interested in. This table stores the user ID and the product ID for each item in the wishlist. It is used to manage user wishlists in the application.

# Create DB tables

- Users
- Brands
- Categories

## 
- products
- variants
- product images
- orders
- orders items
- addresses
- reviews
- wishlist