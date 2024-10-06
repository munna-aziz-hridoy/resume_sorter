/*
  Warnings:

  - You are about to drop the column `requirements` on the `Job_Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job_Post" DROP COLUMN "requirements",
ADD COLUMN     "additional_requirements" TEXT[],
ADD COLUMN     "responsibilities" TEXT[];
