import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  password_hash?: string
}

export function makeOrg(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    name: faker.company.name(),
    author_name: faker.person.fullName(),
    email: faker.internet.email(),
    password_hash: overwrite?.password_hash ?? faker.internet.password(),
    whatsapp_number: faker.phone.number(),
    cep: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    neighborhood: faker.location.streetAddress(),
    street: faker.location.street(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    created_at: faker.date.anytime(),
  }
}
