import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const updatedUser = await prisma.user.update({
    where: { id : "6624cbef6c697df514a5677c" },
    data: {
      profile: {
        update: {
          image: {
            connect : { id : '66250a93818f92ff07505d09' }
          },
        },
      },
    },
  });

  console.log(updatedUser);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
