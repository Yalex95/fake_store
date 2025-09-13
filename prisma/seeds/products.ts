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
        {
          color: "Black",
          sizes: ["40", "41", "42"],
          standardPrice: 109,
          salePrice: 100,
        },
        {
          color: "Purple",
          sizes: ["40", "41", "42"],
          standardPrice: 114,
          salePrice: 100,
        },
      ],
    },
    {
      name: "Nike Air Max 270",
      description:
        "Nike athletic sneakers with great cushioning and modern design.",
      rating: 4.8,
      categories: ["women", "women-footwear"],
      variants: [
        {
          color: "White",
          sizes: ["38", "39", "40", "41"],
          standardPrice: 129,
          salePrice: 100,
        },
        {
          color: "Red",
          sizes: ["38", "39", "40", "41"],
          standardPrice: 129,
          salePrice: 100,
        },
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
    //vincular categorias con los productos
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
      const variantSlug = `/product/${slug}/${product.id.slice(0, 4)}-${
        v.color
      }`;
      // const slug = 
      //       const variantSlug = `/product/${slug}/${p.name.toLowerCase()}-${v.color}`;
      

      const variant = await prisma.product_variants.create({
        data: {
          productId: product.id,
          slug: "", //TODO: cambiarlo por el id y recortar,
          identifier:"",
          name: `${p.name} - ${v.color}`,
          color: v.color,
          standardPrice: v.standardPrice,
          salePrice: v.salePrice,
          image: `/images/product/${slug}-${v.color.toLowerCase()}-main.jpg`,
          isDefault: false,
        },
      });
      //volver a asignar el slug product/${slug}/${sku}
      await prisma.product_variants.updateMany({
        where:{id:variant.id},
        data:{
          slug: `/product/${slug}/${variant.id.slice(0,8)}`,
          identifier: variant.id.slice(0,8)
        }
      })
      await prisma.variant_images.createMany({
        data: [
          {
            productVariantId: variant.id,
            image_url: `/images/product/${slug}-${v.color.toLowerCase()}-1.jpg`,
          },
          {
            productVariantId: variant.id,
            image_url: `/images/product/${slug}-${v.color.toLowerCase()}-2.jpg`,
          },
        ],
      });

      // --- Crear items (tallas) ---
      for (let i = 0; i < v.sizes.length; i++) {
        const size = v.sizes[i];
        const sku = `${slug}-${v.color.toLowerCase()}-${i}`;

        await prisma.variant_items.create({
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
