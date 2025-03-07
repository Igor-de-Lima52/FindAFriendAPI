import { FastifyInstance } from 'fastify'
import { createPetController } from './create-pet.controller'
import { searchPetController } from './search-pet.controller'
import { getPetController } from './get-pet.controller'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export function petRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', { onRequest: [verifyJwt] }, createPetController)
  app.get('orgs/pets/', searchPetController)
  app.get('/orgs/pets/:id', getPetController)
}
