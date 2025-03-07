import { Prisma, Org } from '@prisma/client'

export interface FindManyNearbyByParams {
  latitude: number
  longitude: number
}

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  findManyNearby(params: FindManyNearbyByParams): Promise<Org[]>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
