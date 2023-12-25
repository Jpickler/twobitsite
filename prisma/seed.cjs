const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

const main = async () =>{

  // ... you will write your Prisma Client queries here
  console.log(`seeding the database`);

  await prisma.scores.createMany({
  data:[
    {
      name: "joe",
      score: 3,
    },
    {
      name: "john",
      score: 2,
    },
    {
      name: "jenny",
      score: 5,
    },
    {
      name: "james",
      score: 1,
    },
    {
      name: "jacob",
      score: 4,
    },
    {
      name: "julie",
      score: 3,
    }
  ]
});
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
