const { createUsers } = require("./seed/user");
const { createAssets } = require("./seed/aset");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const user = await createUsers();
  const aset = createAssets();
  await prisma.user.createMany({
    data: user,
  });
  await prisma.aset.createMany({
    data: aset,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
