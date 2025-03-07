import { OrgNotFoundError } from '@/use-cases/errors/org-not-found.error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.string(),
  size: z.string(),
  energy_level: z.string(),
  environment: z.string(),
})

export async function createPetController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const body = bodySchema.parse(req.body)

  const createPetUseCase = makeCreatePetUseCase()

  const org_id = req.user.sub

  try {
    const { pet } = await createPetUseCase.execute({ ...body, org_id })

    return reply.status(201).send(pet)
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    console.error(err)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
