/*
  Warnings:

  - You are about to drop the column `lastName` on the `Credentials` table. All the data in the column will be lost.
  - The `joinDate` column on the `Teacher` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Credentials" DROP COLUMN "lastName";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "joinDate",
ADD COLUMN     "joinDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
