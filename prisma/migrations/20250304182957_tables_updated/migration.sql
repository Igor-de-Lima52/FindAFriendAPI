/*
  Warnings:

  - You are about to drop the column `dependency_level` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `user_cep` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `requirements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `about` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_user_id_user_cep_fkey";

-- DropForeignKey
ALTER TABLE "requirements" DROP CONSTRAINT "requirements_pet_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "dependency_level",
DROP COLUMN "description",
DROP COLUMN "user_cep",
DROP COLUMN "user_id",
ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "org_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "requirements";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "DependencyLevel";

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp_number" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_id_cep_key" ON "orgs"("id", "cep");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
