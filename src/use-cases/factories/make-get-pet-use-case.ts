import { GetPetUseCase } from '../get-pet.use-case'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeGetPetUseCase() {
  return new GetPetUseCase(new PrismaPetRepository())
}
