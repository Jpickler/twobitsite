const router = require("express").Router();
const {prismaClient, PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();


router.get("/", async (req, res)=>{
  console.log(`in api/scores`);
  const allScores= await prisma.scores.findMany();
  console.log(allScores);
  // res.json(allScores);
  res.send(allScores);

  // await prisma.$disconnect(); // disconnects from the server
});

module.exports = router;