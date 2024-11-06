/*
  Warnings:

  - You are about to drop the column `courseId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `highestQualification` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `joinDate` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `specalization` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_courseId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "courseId",
DROP COLUMN "dateOfBirth",
DROP COLUMN "highestQualification",
DROP COLUMN "password",
DROP COLUMN "phoneNumber";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "courseId",
DROP COLUMN "description",
DROP COLUMN "joinDate",
DROP COLUMN "phoneNumber",
DROP COLUMN "specalization";
