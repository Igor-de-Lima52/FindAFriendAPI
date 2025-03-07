import request from 'supertest'

import { app } from '@/app'
import { makeOrg } from 'tests/make-org.factory'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an org', async () => {
    const org = makeOrg()

    const response = await request(app.server).post('/orgs').send(org)

    expect(response.status).toBe(201)
  })
})
