import { Org, Prisma } from '@prisma/client'
import { FindManyNearbyByParams, OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    const org = prisma.org.findUnique({ where: { id } })

    return org
  }

  async findByEmail(email: string) {
    const org = prisma.org.findUnique({ where: { email } })

    return org
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyByParams) {
    const orgs = await prisma.$queryRaw<Org[]>`
      SELECT * from orgs
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return orgs
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = prisma.org.create({ data })

    return org
  }
}
