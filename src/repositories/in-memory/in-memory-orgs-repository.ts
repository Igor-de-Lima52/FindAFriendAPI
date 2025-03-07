import { Org, Prisma } from '@prisma/client'
import { FindManyNearbyByParams, OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistaceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    return this.items.find((item) => item.id === id) || null
  }

  async findByEmail(email: string) {
    return this.items.find((item) => item.email === email) || null
  }

  async findManyNearby(params: FindManyNearbyByParams) {
    return this.items.filter((item) => {
      const distance = getDistaceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
