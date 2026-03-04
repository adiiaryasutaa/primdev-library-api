/*
  Warnings:

  - Added the required column `borrowerId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "borrowerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Borrowers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Borrowers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Borrowers_phone_key" ON "Borrowers"("phone");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrowers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
