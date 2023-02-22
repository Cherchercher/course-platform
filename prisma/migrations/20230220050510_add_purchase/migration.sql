/*
  Warnings:

  - The primary key for the `Purchase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Purchase` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`, `productId`);
