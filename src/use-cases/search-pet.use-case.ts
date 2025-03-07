import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetUseCaseRequest {
  city: string
  age?: string
  size?: string
  energyLevel?: string
  environment?: string
}

interface SearchPetUseCaseResponse {
  pets: Pet[]
}

export class SearchPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energyLevel,
    environment,
  }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      energyLevel,
      environment,
      size,
    })

    return { pets }
  }
}
