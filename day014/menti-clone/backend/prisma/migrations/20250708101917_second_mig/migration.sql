/*
  Warnings:

  - Added the required column `noofquestions` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "noofquestions" INTEGER NOT NULL;
