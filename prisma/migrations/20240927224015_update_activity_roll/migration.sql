/*
  Warnings:

  - Added the required column `status` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity` ADD COLUMN `status` VARCHAR(191) NOT NULL;