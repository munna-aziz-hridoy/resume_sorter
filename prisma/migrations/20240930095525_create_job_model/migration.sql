-- CreateTable
CREATE TABLE "Job_Post" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "job_description" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Job_Post_pkey" PRIMARY KEY ("id")
);
