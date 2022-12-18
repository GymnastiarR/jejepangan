/*
  Warnings:

  - You are about to drop the column `Verified` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `Verified`,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;
