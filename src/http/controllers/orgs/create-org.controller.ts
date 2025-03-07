import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists.error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  author_name: z.string(),
  email: z.string().email(),
  whatsapp_number: z.string(),
  password: z.string(),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export async function createOrgController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const body = bodySchema.parse(req.body)

  const createUseCase = makeCreateOrgUseCase()

  try {
    const { org } = await createUseCase.execute(body)

    return reply.status(201).send(org)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
