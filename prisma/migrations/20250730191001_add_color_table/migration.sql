/*
  Warnings:

  - You are about to drop the column `color` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId,image_url]` on the table `product_images` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[itemCode]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."products" DROP COLUMN "color";

-- CreateTable
CREATE TABLE "public"."colors" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "color" VARCHAR(255),

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "colors_productId_color_key" ON "public"."colors"("productId", "color");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "public"."categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_images_productId_image_url_key" ON "public"."product_images"("productId", "image_url");

-- CreateIndex
CREATE UNIQUE INDEX "products_itemCode_key" ON "public"."products"("itemCode");

-- AddForeignKey
ALTER TABLE "public"."colors" ADD CONSTRAINT "colors_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
