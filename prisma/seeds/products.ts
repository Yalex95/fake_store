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

async function main() {
  const products = [
    {
      name: "Adidas SL 72 OG",
      description:
        "Classic Adidas sneakers with retro style and all-day comfort.",
      rating: 4.5,
      categories: ["men", "men-footwear"], // slugs de categorías existentes
      variants: [
        { color: "Black", sizes: ["40", "41", "42"], price: 109 },
        { color: "Purple", sizes: ["40", "41", "42"], price: 114 },
      ],
    },
    {
      name: "Nike Air Max 270",
      description:
        "Nike athletic sneakers with great cushioning and modern design.",
      rating: 4.8,
      categories: ["women", "women-footwear"],
      variants: [
        { color: "White", sizes: ["38", "39", "40", "41"], price: 129 },
        { color: "Red", sizes: ["38", "39", "40", "41"], price: 129 },
      ],
    },
  ];

  for (const p of products) {
    const slug = slugify(p.name);
    
    // --- Crear producto ---
    const product = await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        rating: p.rating,
      },
    });

    // --- Vincular categorías existentes ---
    const categories = await prisma.category.findMany({
      where: {
        slug: {
          in: Array.isArray(p.categories) ? p.categories : [p.categories],
        },
      },
    });
   for (const cat of categories) {
  await prisma.product_categories.create({
    data: {
      productId: product.id,
      categoryId: cat.id,
    },
  });
}
    // --- Crear variantes ---
    for (const v of p.variants) {
      const variantSlug = `${slug}-${v.color.toLowerCase()}`;
      const variant = await prisma.product_variants.upsert({
        where: { slug: variantSlug },
        update: {},
        create: {
          productId: product.id,
          slug: variantSlug,
          name: `${p.name} - ${v.color}`,
          color: v.color,
          standardPrice: v.price,
          salePrice: v.price,
          image: `/images/product/${variantSlug}-main.jpg`,
          isDefault: false,
          // stock: v.stock,
        },
      });
      await prisma.variant_images.createMany({
          data: [
            {
              productVariantId: variant.id,
              image_url: `/images/product/${variantSlug}-1.jpg`,
            },
            {
              productVariantId: variant.id,
              image_url: `/images/product/${variantSlug}-2.jpg`,
            },
          ],
        });

      // --- Crear items (tallas) ---
      for (let i = 0; i < v.sizes.length; i++) {
        const size = v.sizes[i];
        const sku = `${variantSlug}-${size}-${i}`;

        const item = await prisma.variant_items.create({
          data: {
            productVariantId: variant.id,
            sku,
            size,
            stock: 20,
          },
        });

        
      }
    }
  }

  console.log("✅ Product seed completed.");
}

main()
  .then(async () => {
    console.log("✅ product seed with existing categories completed.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error in seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
