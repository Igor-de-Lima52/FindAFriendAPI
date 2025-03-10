import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreatePetUseCase } from '../create-pet.use-case'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeCreatePetUseCase() {
  return new CreatePetUseCase(
    new PrismaOrgsRepository(),
    new PrismaPetRepository(),
  )
}
