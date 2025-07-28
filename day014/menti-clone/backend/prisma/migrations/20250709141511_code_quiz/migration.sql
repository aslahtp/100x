/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_code_key" ON "Quiz"("code");
