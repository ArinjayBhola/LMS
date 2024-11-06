/*
  Warnings:

  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[credentialsId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[credentialsId]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `startDate` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Student_email_key";

-- DropIndex
DROP INDEX "Teacher_email_key";

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "startDate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "credentialsId" TEXT,
ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "highestQualification" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "password",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "credentialsId" TEXT,
ADD COLUMN     "joinDate" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "specialization" TEXT;

-- CreateTable
CREATE TABLE "Credentials" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_email_key" ON "Credentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_credentialsId_key" ON "Student"("credentialsId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_credentialsId_key" ON "Teacher"("credentialsId");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "Credentials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "Credentials"("id") ON DELETE SET NULL ON UPDATE CASCADE;
