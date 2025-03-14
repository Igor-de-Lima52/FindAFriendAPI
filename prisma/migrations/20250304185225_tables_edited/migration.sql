/*
  Warnings:

  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `energy_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `environment` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "age",
ADD COLUMN     "age" TEXT NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" TEXT NOT NULL,
DROP COLUMN "energy_level",
ADD COLUMN     "energy_level" TEXT NOT NULL,
DROP COLUMN "environment",
ADD COLUMN     "environment" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Age";

-- DropEnum
DROP TYPE "EnergyLevel";

-- DropEnum
DROP TYPE "Environment";

-- DropEnum
DROP TYPE "Size";
