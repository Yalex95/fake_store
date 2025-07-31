/*
  Warnings:

  - You are about to drop the column `productId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `itemCode` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `colors` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[variantId,image_url]` on the table `product_images` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variantId` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantId` to the `product_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."colors" DROP CONSTRAINT "colors_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."order_items" DROP CONSTRAINT "order_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_images" DROP CONSTRAINT "product_images_productId_fkey";

-- DropIndex
DROP INDEX "public"."product_images_productId_image_url_key";

-- DropIndex
DROP INDEX "public"."products_itemCode_key";

-- AlterTable
ALTER TABLE "public"."order_items" DROP COLUMN "productId",
ADD COLUMN     "variantId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."product_images" DROP COLUMN "productId",
ADD COLUMN     "variantId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."products" DROP COLUMN "brand",
DROP COLUMN "image_url",
DROP COLUMN "itemCode",
DROP COLUMN "price",
DROP COLUMN "size",
DROP COLUMN "stock",
ADD COLUMN     "brandId" UUID NOT NULL;

-- DropTable
DROP TABLE "public"."colors";

-- CreateTable
CREATE TABLE "public"."variants" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "sku" VARCHAR(255) NOT NULL,
    "color" VARCHAR(100),
    "size" VARCHAR(255),
    "price" DOUBLE PRECISION,
    "image_url" VARCHAR(255),
    "stock" INTEGER DEFAULT 0,
    "percentageOff" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "deletedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."brands" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "logo" VARCHAR(255),

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "variants_sku_key" ON "public"."variants"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "public"."brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_images_variantId_image_url_key" ON "public"."product_images"("variantId", "image_url");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."variants" ADD CONSTRAINT "variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."product_images" ADD CONSTRAINT "product_images_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "public"."variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "public"."variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
