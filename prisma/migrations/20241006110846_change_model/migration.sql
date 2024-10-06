-- AlterTable
ALTER TABLE "Job_Post" ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "note" TEXT,
ADD COLUMN     "qualificatons" TEXT[],
ADD COLUMN     "requirements" TEXT[],
ADD COLUMN     "status" TEXT;

-- CreateTable
CREATE TABLE "Candidates" (
    "id" SERIAL NOT NULL,
    "job_post_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "rank" DOUBLE PRECISION NOT NULL,
    "resume" TEXT NOT NULL,

    CONSTRAINT "Candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Short_Listed" (
    "id" SERIAL NOT NULL,
    "job_post_id" INTEGER NOT NULL,
    "candidate_id" INTEGER NOT NULL,

    CONSTRAINT "Short_Listed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Candidates" ADD CONSTRAINT "Candidates_job_post_id_fkey" FOREIGN KEY ("job_post_id") REFERENCES "Job_Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Short_Listed" ADD CONSTRAINT "Short_Listed_job_post_id_fkey" FOREIGN KEY ("job_post_id") REFERENCES "Job_Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Short_Listed" ADD CONSTRAINT "Short_Listed_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
