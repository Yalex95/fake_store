/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `product_variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."product_variants" ADD COLUMN     "identifier" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_identifier_key" ON "public"."product_variants"("identifier");
