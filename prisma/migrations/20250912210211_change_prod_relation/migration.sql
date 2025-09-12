/*
  Warnings:

  - You are about to drop the column `variantId` on the `variant_images` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productVariantId,image_url]` on the table `variant_images` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `category` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `productVariantId` to the `variant_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."variant_images" DROP CONSTRAINT "variant_images_variantId_fkey";

-- DropIndex
DROP INDEX "public"."variant_images_variantId_image_url_key";

-- AlterTable
ALTER TABLE "public"."category" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."variant_images" DROP COLUMN "variantId",
ADD COLUMN     "productVariantId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "variant_images_productVariantId_image_url_key" ON "public"."variant_images"("productVariantId", "image_url");

-- AddForeignKey
ALTER TABLE "public"."variant_images" ADD CONSTRAINT "variant_images_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "public"."product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
