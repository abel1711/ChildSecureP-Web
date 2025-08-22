/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Modules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Modules_name_key" ON "public"."Modules"("name");
