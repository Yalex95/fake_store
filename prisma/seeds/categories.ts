import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Main Catecategory
    const man = await prisma.category.upsert({
    where: { slug: "man" },
    update: {},
    create: { name: "Man", slug: "man" },
  });

  const woman = await prisma.category.upsert({
    where: { slug: "woman" },
    update: {},
    create: { name: "Woman", slug: "woman" },
  });

  const kids = await prisma.category.upsert({
    where: { slug: "kids" },
    update: {},
    create: { name: "Kids", slug: "kids" },
  });

  const sports = await prisma.category.upsert({
    where: { slug: "sports" },
    update: {},
    create: { name: "Sports", slug: "sports" },
  });

// sub category
  // ========================
  // subcat Man
  // ========================
  await prisma.category.upsert({
    where: { slug: "man-footwear" },
    update: {},
    create: { name: "Footwear", slug: "man-footwear", parentId: man.id },
  });

  await prisma.category.upsert({
    where: { slug: "man-clothes" },
    update: {},
    create: { name: "Clothes", slug: "man-clothes", parentId: man.id },
  });

  await prisma.category.upsert({
    where: { slug: "man-accessories" },
    update: {},
    create: { name: "Accessories", slug: "man-accessories", parentId: man.id },
  });

  // ========================
  // subcat Woman
  // ========================
  await prisma.category.upsert({
    where: { slug: "woman-footwear" },
    update: {},
    create: { name: "Footwear", slug: "woman-footwear", parentId: woman.id },
  });

  await prisma.category.upsert({
    where: { slug: "woman-clothes" },
    update: {},
    create: { name: "Clothes", slug: "woman-clothes", parentId: woman.id },
  });

  await prisma.category.upsert({
    where: { slug: "woman-accessories" },
    update: {},
    create: { name: "Accessories", slug: "woman-accessories", parentId: woman.id },
  });

  // ========================
  // subcat Kids-Boys and Kids-Girls
  // ========================
  await prisma.category.upsert({
    where: { slug: "kids-boys" },
    update: {},
    create: { name: "Boy's Clothes", slug: "kids-boys", parentId: kids.id },
  });

  await prisma.category.upsert({
    where: { slug: "kids-girls" },
    update: {},
    create: { name: "Girl's Clothes", slug: "kids-girls", parentId: kids.id },
  });

  // ========================
  // subcat Sports
  // ========================
  await prisma.category.upsert({
    where: { slug: "sports-soccer" },
    update: {},
    create: { name: "Soccer", slug: "sports-soccer", parentId: sports.id },
  });

  await prisma.category.upsert({
    where: { slug: "sports-running" },
    update: {},
    create: { name: "Running", slug: "sports-running", parentId: sports.id },
  });

  await prisma.category.upsert({
    where: { slug: "sports-training" },
    update: {},
    create: { name: "Training", slug: "sports-training", parentId: sports.id },
  });

}

main()
  .then(() => {
    console.log("✅ Fake category inserted.");
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
