const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

async function main() {
  const topics = await fs.promises.readFile("./prisma/topics.json", "utf8");
  const users = await fs.promises.readFile("./prisma/users.json", "utf8");
  const topicJson = JSON.parse(topics);
  const userJson = JSON.parse(users);

  // topic data seeding
  for (const item of topicJson) {
    const createdTopic = await prisma.topic.create({
      data: {
        name: item.name,
        parentId : null
      },
    });
  
    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        await prisma.topic.create({
          data: {
            name: child.name,
            parentId: createdTopic.id, 
          },
        });
      }
    }
  }

  // User data seeing
  for (const item of userJson) {
    await prisma.user.create({
      data: {
        email: item.email,
        name: item.name,
        username: item.username,
        password: item.password,
        profile: {
          create: {
            dob: "",
            bio: "",
            phone: "",
            image: "",
          },
        },
      },
    });
  }

  console.log("Users seeding successfully");
  console.log("Topics seeding successfully");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
