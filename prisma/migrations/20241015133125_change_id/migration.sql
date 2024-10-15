/*
  Warnings:

  - You are about to drop the column `job_post_id` on the `Candidates` table. All the data in the column will be lost.
  - The primary key for the `Job_Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Job_Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Candidates" DROP CONSTRAINT "Candidates_job_post_id_fkey";

-- AlterTable
ALTER TABLE "Candidates" DROP COLUMN "job_post_id",
ADD COLUMN     "job_PostId" INTEGER;

-- AlterTable
ALTER TABLE "Job_Post" DROP CONSTRAINT "Job_Post_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Job_Post_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Candidates" ADD CONSTRAINT "Candidates_job_PostId_fkey" FOREIGN KEY ("job_PostId") REFERENCES "Job_Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
