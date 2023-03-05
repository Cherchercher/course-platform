/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Feature_description_key` ON `Feature`(`description`);
