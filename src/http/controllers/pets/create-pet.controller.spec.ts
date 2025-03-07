import request from 'supertest'

import { app } from '@/app'
import { makeOrg } from 'tests/make-org.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makePet } from 'tests/make-pet.factory'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password_hash })

    const response = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    expect(response.status).toBe(201)
  })
})
