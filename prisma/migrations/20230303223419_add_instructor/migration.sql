/*
  Warnings:

  - Added the required column `instructor` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructorCredential` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` ADD COLUMN `instructor` VARCHAR(191) NOT NULL,
    ADD COLUMN `instructorCredential` VARCHAR(191) NOT NULL;
