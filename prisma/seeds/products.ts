import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Función para generar slug
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Product data
const productData = [
  {
    name: "Adidas SL 72 OG",
    description: "Classic Adidas sneakers with retro style and all-day comfort.",
    rating: 4.5,
    gender: "Men",
    type: "Footwear",
    sport: "Casual",
    product_variants: [
      { color: "Black", sizes: ["38", "39", "40", "41", "42"], price: 109 },
      { color: "Purple", sizes: ["38", "39", "40", "41", "42"], price: 114 },
    ],
  },
  {
    name: "Nike Air Max 270",
    description: "Nike athletic sneakers with great cushioning and modern design.",
    rating: 4.8,
    gender: "Men",
    type: "Footwear",
    sport: "Sport",
    product_variants: [
      { color: "White", sizes: ["40", "41", "42", "43"], price: 129 },
      { color: "Black", sizes: ["40", "41", "42", "43"], price: 129 },
    ],
  },
];

async function main() {
  // Fetch existing categories from DB
  const categories = await prisma.category.findMany();
  const categoryMap: Record<string, any> = {};
  categories.forEach(cat => {
    categoryMap[cat.name.toLowerCase()] = cat;
  });

  for (const prod of productData) {
    const slug = slugify(prod.name);

    // Create or update product
    const product = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: prod.name,
        description: prod.description,
        rating: prod.rating,
        slug,
      },
    });

    // Assign categories that already exist
    if (categoryMap[prod.gender.toLowerCase()]) {
      await prisma.product_categories.create({
        data: {
          productId: product.id,
          categoryId: categoryMap[prod.gender.toLowerCase()].id,
        },
      });
    }
    if (categoryMap[prod.type.toLowerCase()]) {
      await prisma.product_categories.create({
        data: {
          productId: product.id,
          categoryId: categoryMap[prod.type.toLowerCase()].id,
        },
      });
    }

    // Create product_variants and nested variant_items
    for (const variantData of prod.product_variants) {
      // product_variant (ej. Black, Purple)
      const variant = await prisma.product_variants.create({
        data: {
          productId: product.id,
          color: variantData.color,
          standardPrice: variantData.price,
          salePrice: variantData.price,
          image: `/images/product/${slug}-${variantData.color}-main.jpg`,
          altImage: `/images/product/${slug}-${variantData.color}-alt.jpg`,
          isDefault: false,
        },
      });

      // Sizes → variant_items
      for (const size of variantData.sizes) {
        const sku = `${slug}-${variantData.color.toLowerCase()}-${size}`;
        const item = await prisma.variant_items.create({
          data: {
            productVariantId: variant.id,
            sku,
            size,
            stock: 20,
          },
        });

        // Images por SKU → variant_images
        await prisma.variant_images.createMany({
          data: [
            {
              variantId: item.id,
              image_url: `/images/product/${slug}-${variantData.color}-${size}-1.jpg`,
            },
            {
              variantId: item.id,
              image_url: `/images/product/${slug}-${variantData.color}-${size}-2.jpg`,
            },
          ],
        });
      }
    }
  }
}

main()
  .then(async () => {
    console.log("✅  product seed with existing categories completed.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
