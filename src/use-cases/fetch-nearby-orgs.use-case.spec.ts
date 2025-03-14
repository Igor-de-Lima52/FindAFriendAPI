import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyOrgsUseCase } from './fetch-nearby-orgs.use-case'
import { makeOrg } from 'tests/make-org.factory'

describe('Create Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: FetchNearbyOrgsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchNearbyOrgsUseCase(orgsRepository)
  })

  it('should be able to fetch nearby orgs', async () => {
    const org = await orgsRepository.create(makeOrg())

    const response = await sut.execute({
      userLatitude: org.latitude.toNumber(),
      userLongitude: org.longitude.toNumber(),
    })

    const orgs = await response.orgs

    expect(orgs).toEqual([org])
  })
})
