/*
  Warnings:

  - Added the required column `description` to the `Modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Modules" ADD COLUMN     "description" TEXT NOT NULL;
