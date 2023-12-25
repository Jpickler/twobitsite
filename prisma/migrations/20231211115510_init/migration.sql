-- CreateTable
CREATE TABLE "scores" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "scores_pkey" PRIMARY KEY ("id")
);
