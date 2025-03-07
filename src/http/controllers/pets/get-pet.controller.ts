import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const routeSchema = z.object({
  id: z.string(),
})

export async function getPetController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = routeSchema.parse(req.params)

  const getPetUseCase = makeGetPetUseCase()

  try {
    const { pet } = await getPetUseCase.execute({ id })

    return reply.status(200).send(pet)
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    console.error(err)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
