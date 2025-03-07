-- CreateEnum
CREATE TYPE "Age" AS ENUM ('Puppy', 'Adult');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('Small', 'Medium', 'Big');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('VeryLow', 'Low', 'Medium', 'High', 'VeryHigh');

-- CreateEnum
CREATE TYPE "DependencyLevel" AS ENUM ('Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('Wide', 'Medium', 'Tight');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cep" DECIMAL(65,30) NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp_number" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" "Age" NOT NULL DEFAULT 'Puppy',
    "size" "Size" NOT NULL DEFAULT 'Medium',
    "energy_level" "EnergyLevel" NOT NULL DEFAULT 'Medium',
    "dependency_level" "DependencyLevel" NOT NULL DEFAULT 'Medium',
    "environment" "Environment" NOT NULL DEFAULT 'Medium',
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usersId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requirements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petsId" TEXT NOT NULL,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
