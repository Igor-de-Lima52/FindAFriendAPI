import { FastifyInstance } from 'fastify'
import { createOrgController } from './create-org.controller'
import { authenticateOrgController } from './authenticate-org.controller'
import { fetchNearbyController } from './fetch-nearby.controller'

export function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController)
  app.post('/orgs/authenticate', authenticateOrgController)
  app.get('/orgs/nearby', fetchNearbyController)
}
