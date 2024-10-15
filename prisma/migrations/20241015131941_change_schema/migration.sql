/*
  Warnings:

  - You are about to drop the column `job_PostId` on the `Candidates` table. All the data in the column will be lost.
  - You are about to drop the column `resume` on the `Candidates` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Candidates` table. All the data in the column will be lost.
  - You are about to drop the column `additional_requirements` on the `Job_Post` table. All the data in the column will be lost.
  - You are about to drop the column `benefits` on the `Job_Post` table. All the data in the column will be lost.
  - You are about to drop the column `education` on the `Job_Post` table. All the data in the column will be lost.
  - You are about to drop the column `qualifications` on the `Job_Post` table. All the data in the column will be lost.
  - You are about to drop the column `responsibilities` on the `Job_Post` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Job_Post` table. All the data in the column will be lost.
  - You are about to drop the `Short_Listed` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `education` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume_url` to the `Candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university` to the `Candidates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Candidates" DROP CONSTRAINT "Candidates_job_PostId_fkey";

-- DropForeignKey
ALTER TABLE "Short_Listed" DROP CONSTRAINT "Short_Listed_candidate_id_fkey";

-- DropForeignKey
ALTER TABLE "Short_Listed" DROP CONSTRAINT "Short_Listed_job_PostId_fkey";

-- AlterTable
ALTER TABLE "Candidates" DROP COLUMN "job_PostId",
DROP COLUMN "resume",
DROP COLUMN "status",
ADD COLUMN     "education" TEXT NOT NULL,
ADD COLUMN     "job_experience" TEXT[],
ADD COLUMN     "previous_company" TEXT[],
ADD COLUMN     "resume_url" TEXT NOT NULL,
ADD COLUMN     "university" TEXT NOT NULL,
ALTER COLUMN "job_post_id" DROP NOT NULL,
ALTER COLUMN "job_post_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Job_Post" DROP COLUMN "additional_requirements",
DROP COLUMN "benefits",
DROP COLUMN "education",
DROP COLUMN "qualifications",
DROP COLUMN "responsibilities",
DROP COLUMN "user_id";

-- DropTable
DROP TABLE "Short_Listed";

-- AddForeignKey
ALTER TABLE "Candidates" ADD CONSTRAINT "Candidates_job_post_id_fkey" FOREIGN KEY ("job_post_id") REFERENCES "Job_Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
