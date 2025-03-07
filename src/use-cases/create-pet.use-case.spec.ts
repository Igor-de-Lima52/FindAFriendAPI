import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet.use-case'
import { OrgNotFoundError } from './errors/org-not-found.error'
import { makeOrg } from 'tests/make-org.factory'
import { makePet } from 'tests/make-pet.factory'

describe('Create Pet Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: CreatePetUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(orgsRepository, petsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = await orgsRepository.create(makeOrg())
    const { pet } = await sut.execute(makePet({ org_id: org.id }))

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet with a non-existing org', async () => {
    const pet = makePet()

    await petsRepository.create(pet)

    await expect(sut.execute(pet)).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
