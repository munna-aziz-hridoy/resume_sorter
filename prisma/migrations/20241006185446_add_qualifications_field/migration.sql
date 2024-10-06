/*
  Warnings:

  - The primary key for the `Job_Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `Job_Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `note` on table `Job_Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Job_Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Candidates" DROP CONSTRAINT "Candidates_job_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Short_Listed" DROP CONSTRAINT "Short_Listed_job_post_id_fkey";

-- AlterTable
ALTER TABLE "Candidates" ADD COLUMN     "job_PostId" TEXT;

-- AlterTable
ALTER TABLE "Job_Post" DROP CONSTRAINT "Job_Post_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "note" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ADD CONSTRAINT "Job_Post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Job_Post_id_seq";

-- AlterTable
ALTER TABLE "Short_Listed" ADD COLUMN     "job_PostId" TEXT;

-- AddForeignKey
ALTER TABLE "Candidates" ADD CONSTRAINT "Candidates_job_PostId_fkey" FOREIGN KEY ("job_PostId") REFERENCES "Job_Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Short_Listed" ADD CONSTRAINT "Short_Listed_job_PostId_fkey" FOREIGN KEY ("job_PostId") REFERENCES "Job_Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
