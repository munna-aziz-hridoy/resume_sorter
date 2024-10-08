-- AlterTable
ALTER TABLE "Job_Post" ALTER COLUMN "benefits" SET NOT NULL,
ALTER COLUMN "benefits" SET DATA TYPE TEXT,
ALTER COLUMN "additional_requirements" SET NOT NULL,
ALTER COLUMN "additional_requirements" SET DATA TYPE TEXT,
ALTER COLUMN "responsibilities" SET NOT NULL,
ALTER COLUMN "responsibilities" SET DATA TYPE TEXT,
ALTER COLUMN "qualifications" SET NOT NULL,
ALTER COLUMN "qualifications" SET DATA TYPE TEXT;
