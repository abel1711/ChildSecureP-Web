-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "expiration" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "public"."Modules" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_DeviceToModules" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DeviceToModules_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DeviceToModules_B_index" ON "public"."_DeviceToModules"("B");

-- AddForeignKey
ALTER TABLE "public"."_DeviceToModules" ADD CONSTRAINT "_DeviceToModules_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DeviceToModules" ADD CONSTRAINT "_DeviceToModules_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
