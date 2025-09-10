/*
  Warnings:

  - You are about to drop the column `image` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `billing_address` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `orders` table. All the data in the column will be lost.
  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `brandId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `products` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the column `percentageOff` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `variants` table. All the data in the column will be lost.
  - You are about to alter the column `size` on the `variants` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to drop the `brands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_images` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `quantity` on table `order_items` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."ShipmentStatus" AS ENUM ('PENDING', 'IN_TRANSIT', 'DELIVERED', 'RETURNED');

-- DropForeignKey
ALTER TABLE "public"."product_images" DROP CONSTRAINT "product_images_variantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_brandId_fkey";

-- AlterTable
ALTER TABLE "public"."categories" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "public"."order_items" ALTER COLUMN "quantity" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."orders" DROP COLUMN "billing_address",
DROP COLUMN "shipping_address",
DROP COLUMN "total_amount",
ADD COLUMN     "billingAddress" TEXT,
ADD COLUMN     "shippingAddress" TEXT,
ADD COLUMN     "totalAmount" DOUBLE PRECISION,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."OrderStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."products" DROP COLUMN "brandId",
DROP COLUMN "title",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "role",
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "public"."variants" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "percentageOff",
DROP COLUMN "price",
DROP COLUMN "updatedAt",
ADD COLUMN     "salePrice" DOUBLE PRECISION,
ADD COLUMN     "standarPrice" DOUBLE PRECISION,
ALTER COLUMN "size" SET DATA TYPE VARCHAR(50);

-- DropTable
DROP TABLE "public"."brands";

-- DropTable
DROP TABLE "public"."product_images";

-- CreateTable
CREATE TABLE "public"."product_link_list" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "type" VARCHAR(100),
    "name" VARCHAR(255),
    "url" VARCHAR(500),
    "image" VARCHAR(500),
    "altImage" VARCHAR(500),
    "searchColor" VARCHAR(100),
    "defaultColor" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_link_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."view_list" (
    "id" UUID NOT NULL,
    "variantId" UUID NOT NULL,
    "image_url" VARCHAR(500),

    CONSTRAINT "view_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."carts" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cart_items" (
    "id" UUID NOT NULL,
    "cartId" UUID NOT NULL,
    "variantId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "provider" VARCHAR(100),
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "amount" DOUBLE PRECISION,
    "transactionId" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shipments" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "courier" VARCHAR(100),
    "tracking" VARCHAR(255),
    "status" "public"."ShipmentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "view_list_variantId_image_url_key" ON "public"."view_list"("variantId", "image_url");

-- CreateIndex
CREATE INDEX "addresses_userId_idx" ON "public"."addresses"("userId");

-- CreateIndex
CREATE INDEX "order_items_orderId_variantId_idx" ON "public"."order_items"("orderId", "variantId");

-- CreateIndex
CREATE INDEX "orders_userId_idx" ON "public"."orders"("userId");

-- CreateIndex
CREATE INDEX "reviews_productId_idx" ON "public"."reviews"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE INDEX "wishlists_userId_productId_idx" ON "public"."wishlists"("userId", "productId");

-- AddForeignKey
ALTER TABLE "public"."product_link_list" ADD CONSTRAINT "product_link_list_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."view_list" ADD CONSTRAINT "view_list_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "public"."variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."carts" ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cart_items" ADD CONSTRAINT "cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cart_items" ADD CONSTRAINT "cart_items_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "public"."variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shipments" ADD CONSTRAINT "shipments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
