import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/make-authenticate-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function authenticateOrgController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const body = bodySchema.parse(req.body)

  const authenticateUseCase = makeAuthenticateOrgUseCase()

  try {
    const { org } = await authenticateUseCase.execute(body)

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
