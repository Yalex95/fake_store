# 🛒 Nuxt Fake Store

A **Nuxt 4** fake e-commerce store powered by:

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
* [Docker](https://www.docker.com/get-started/)
Docker is used to contain 
* [Postgre](https://www.docker.com/get-started/)
Data base used on this application

---
## 🚀 Getting Started
Follow these steps to set up the project:

### 1. Clone & Install Dependencies
   ```bash
   git clone
   cd nuxt-fake-store
   npm i
    ```
### 2. Build Docker containers 
``` bash
 docker compose up --build 
 ```
### 3. Start the aplication 
on prod env
``` bash
docker compose up 
```
on dev env
```
docker compose -f docker-compose.dev.yml up --build
```
➡ Your server will be available at http://localhost:3000

### 4. Connect to the DB
use your favorite db client to connect(default: PostgreSQL)

### 5. Run Database Migrations
```bash 
npx prisma migrate deploy
```

### 6. Seed the db
#### sedd on Dev Environment
```
docker compose exec server npx tsx prisma/seeds/products.ts
```
⚠️ Seed in the correct order:
Step 1 (no relations)
 - Users
- Brands
- Categories
Step 2 (with relations)
- products
- variants
- product images

- orders
- orders items
- addresses
- reviews
- wishlist
---
## 🛠️ Prisma Commands

- `npx prisma generate` 
-> generates Prisma client from schema `prisma/schema.prisma`.

- `npx prisma migrate reset`
-> Resets and reapplies all migrations from the beginning (dev only).


- `npx prisma migrate dev --name change-id-to-uuid` -> Creates a new migration

- `npx tsx prisma/seeds/seed.ts`-> Run custom seed script

---
## DB Schema Overview

#### 📌 Users

- Stores user info (name, email, password, etc.) for authentication & management.

#### 📌 Products

- Contains product details (name, description, price, etc.).

#### 📌 Variants

- Represents different versions of a product (sizes, colors, etc.).

#### 📌 Product Images

- Stores multiple images for each product.

#### 📌 Reviews

- User-generated product feedback (rating, content, author).

#### 📌 Orders

- Stores order details (user, total amount, status).

#### 📌 Order Items

- Links orders with purchased products.

#### 📌 Addresses

- User shipping & billing addresses.

#### 📌 Brands

- Brand information to categorize products.

#### 📌 Categories

- Organizes products into categories.

#### 📌 Wishlist

- Users can save products they are interested in.

## 📦 Tech Stack

Frontend: Nuxt 4, Nuxt UI, Tailwind CSS

State Management: Pinia

Database & ORM: PostgreSQL + Prisma

Data Generation: Faker.js

Environment: Docker