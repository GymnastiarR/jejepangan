/*
  Warnings:

  - You are about to drop the column `questionsId` on the `formregister` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `FormRegister` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `formRegisterId` to the `QuestionRegister` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `formregister` DROP FOREIGN KEY `FormRegister_questionsId_fkey`;

-- AlterTable
ALTER TABLE `formregister` DROP COLUMN `questionsId`;

-- AlterTable
ALTER TABLE `questionregister` ADD COLUMN `formRegisterId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `FormRegister_eventId_key` ON `FormRegister`(`eventId`);

-- AddForeignKey
ALTER TABLE `QuestionRegister` ADD CONSTRAINT `QuestionRegister_formRegisterId_fkey` FOREIGN KEY (`formRegisterId`) REFERENCES `FormRegister`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
