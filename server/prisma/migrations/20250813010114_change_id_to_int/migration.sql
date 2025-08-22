/*
  Warnings:

  - The primary key for the `ActionLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ActionLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Device` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Device` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `LocationLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LocationLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `StreamSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `StreamSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `deviceId` on the `ActionLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Device` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `deviceId` on the `LocationLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `deviceId` on the `StreamSession` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."ActionLog" DROP CONSTRAINT "ActionLog_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Device" DROP CONSTRAINT "Device_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LocationLog" DROP CONSTRAINT "LocationLog_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StreamSession" DROP CONSTRAINT "StreamSession_deviceId_fkey";

-- AlterTable
ALTER TABLE "public"."ActionLog" DROP CONSTRAINT "ActionLog_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "deviceId",
ADD COLUMN     "deviceId" INTEGER NOT NULL,
ADD CONSTRAINT "ActionLog_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Device" DROP CONSTRAINT "Device_pkey",
ADD COLUMN     "telephone" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Device_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."LocationLog" DROP CONSTRAINT "LocationLog_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "deviceId",
ADD COLUMN     "deviceId" INTEGER NOT NULL,
ADD CONSTRAINT "LocationLog_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."StreamSession" DROP CONSTRAINT "StreamSession_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "deviceId",
ADD COLUMN     "deviceId" INTEGER NOT NULL,
ADD CONSTRAINT "StreamSession_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "public"."Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LocationLog" ADD CONSTRAINT "LocationLog_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActionLog" ADD CONSTRAINT "ActionLog_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StreamSession" ADD CONSTRAINT "StreamSession_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
