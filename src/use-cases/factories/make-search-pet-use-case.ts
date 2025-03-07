import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetUseCase } from '../search-pet.use-case'

export function makeSearchPetUseCase() {
  return new SearchPetUseCase(new PrismaPetRepository())
}
