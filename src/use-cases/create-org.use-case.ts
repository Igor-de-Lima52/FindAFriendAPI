import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists.error'
import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'

interface CreateOrgUseCaseRequest {
  name: string
  author_name: string
  email: string
  whatsapp_number: string
  password_hash: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    author_name,
    email,
    whatsapp_number,
    password_hash,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgByEmail = await this.orgsRepository.findByEmail(email)

    if (orgByEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password = await hash(password_hash, 8)

    const org = await this.orgsRepository.create({
      name,
      author_name,
      email,
      whatsapp_number,
      password_hash: password,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })

    return { org }
  }
}
