/*
  Warnings:

  - You are about to drop the column `slug` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `product_variants` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."product_slug_key";

-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "public"."product_variants" ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_slug_key" ON "public"."product_variants"("slug");
