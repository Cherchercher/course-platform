/*
  Warnings:

  - A unique constraint covering the columns `[courseBucket]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Course_courseBucket_key` ON `Course`(`courseBucket`);
