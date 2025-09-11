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

// Datos de productos en inglés
const productsData = [
  {
    name: "Adidas SL 72 OG",
    description: "Classic Adidas sneakers with retro style and all-day comfort.",
    rating: 4.5,
    gender: "Men",
    type: "Footwear",
    sport: "Casual",
    variants: [
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
    variants: [
      { color: "White", sizes: ["40", "41", "42", "43"], price: 129 },
      { color: "Black", sizes: ["40", "41", "42", "43"], price: 129 },
    ],
  },
];

async function main() {
  // Fetch existing categories from DB
  const categories = await prisma.categories.findMany();
  const categoriesMap: Record<string, any> = {};
  categories.forEach(cat => {
    categoriesMap[cat.name.toLowerCase()] = cat;
  });

  for (const prod of productsData) {
    const slug = slugify(prod.name);

    // Create or update product
    const product = await prisma.products.upsert({
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
    if (categoriesMap[prod.gender.toLowerCase()]) {
      await prisma.product_categories.create({
        data: {
          productId: product.id,
          categoryId: categoriesMap[prod.gender.toLowerCase()].id,
        },
      });
    }

    if (categoriesMap[prod.type.toLowerCase()]) {
      await prisma.product_categories.create({
        data: {
          productId: product.id,
          categoryId: categoriesMap[prod.type.toLowerCase()].id,
        },
      });
    }

    // Add attributes
    await prisma.product_attributes.createMany({
      data: [
        { productId: product.id, key: "gender", value: prod.gender },
        { productId: product.id, key: "type", value: prod.type },
        { productId: product.id, key: "sport", value: prod.sport },
      ],
    });

    // Create variants and product link list
    for (const variantData of prod.variants) {
      for (const size of variantData.sizes) {
        const sku = `${slug}-${variantData.color.toLowerCase()}-${size}`;
        const variant = await prisma.variants.create({
          data: {
            productId: product.id,
            sku,
            size,
            color: variantData.color,
            standardPrice: variantData.price,
            salePrice: variantData.price,
            stock: 20,
            image_url: `/images/products/${slug}-${variantData.color}-${size}.jpg`,
          },
        });

        // Product link list per color
        await prisma.product_link_list.create({
          data: {
            productId: product.id,
            type: "color-variation",
            name: `${prod.name} ${variantData.color}`,
            url: `/products/${slug}-${variantData.color.toLowerCase()}`,
            image: `/images/products/${slug}-${variantData.color}-main.jpg`,
            altImage: `/images/products/${slug}-${variantData.color}-alt.jpg`,
            searchColor: variantData.color,
            defaultColor: variantData.color,
            createdAt: new Date(),
          },
        });

        // View list images
        await prisma.view_list.createMany({
          data: [
            {
              variantId: variant.id,
              image_url: `/images/products/${slug}-${variantData.color}-${size}-1.jpg`,
            },
            {
              variantId: variant.id,
              image_url: `/images/products/${slug}-${variantData.color}-${size}-2.jpg`,
            },
          ],
        });
      }
    }
  }
}

main()
  .then(async () => {
    console.log("✅ English products seed with existing categories completed.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
