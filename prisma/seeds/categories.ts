import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Main Catecategory
    const man = await prisma.category.upsert({
    where: { slug: "men" },
    update: {},
    create: { name: "Men", slug: "men" },
  });

  const women = await prisma.category.upsert({
    where: { slug: "women" },
    update: {},
    create: { name: "Women", slug: "women" },
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
    where: { slug: "men-footwear" },
    update: {},
    create: { name: "Footwear", slug: "men-footwear", parentId: man.id },
  });

  await prisma.category.upsert({
    where: { slug: "men-clothes" },
    update: {},
    create: { name: "Clothes", slug: "men-clothes", parentId: man.id },
  });

  await prisma.category.upsert({
    where: { slug: "men-accessories" },
    update: {},
    create: { name: "Accessories", slug: "men-accessories", parentId: man.id },
  });

  // ========================
  // subcat Women
  // ========================
  await prisma.category.upsert({
    where: { slug: "women-footwear" },
    update: {},
    create: { name: "Footwear", slug: "women-footwear", parentId: women.id },
  });

  await prisma.category.upsert({
    where: { slug: "women-clothes" },
    update: {},
    create: { name: "Clothes", slug: "women-clothes", parentId: women.id },
  });

  await prisma.category.upsert({
    where: { slug: "women-accessories" },
    update: {},
    create: { name: "Accessories", slug: "women-accessories", parentId: women.id },
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
