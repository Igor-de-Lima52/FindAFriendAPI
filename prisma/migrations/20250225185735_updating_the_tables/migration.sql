/*
  Warnings:

  - You are about to drop the column `usersId` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `petsId` on the `requirements` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,cep]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_cep` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_user_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "usersId",
ADD COLUMN     "user_cep" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "requirements" DROP COLUMN "petsId";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cep" SET DATA TYPE TEXT,
ALTER COLUMN "whatsapp_number" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_id_cep_key" ON "users"("id", "cep");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_user_cep_fkey" FOREIGN KEY ("user_id", "user_cep") REFERENCES "users"("id", "cep") ON DELETE RESTRICT ON UPDATE CASCADE;
