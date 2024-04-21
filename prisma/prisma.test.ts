import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newPost = await prisma.post.create({
    data: {
      slug: "title",
      title: "title",
      content: "content",
      published: "PUBLISHED",
      authorId: "6624cbef6c697df514a5677c",
      topics: {
        create: [
          { topic: { connect: { id: "6624cbd36c697df514a5675f" } } },
          { topic: { connect: { id: "6624cbd46c697df514a56760" } } },
        ],
      },
    },
  });
  

  console.log(newPost);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
