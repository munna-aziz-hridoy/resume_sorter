/*
  Warnings:

  - You are about to drop the column `qualificatons` on the `Job_Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job_Post" DROP COLUMN "qualificatons",
ADD COLUMN     "qualifications" TEXT[];
