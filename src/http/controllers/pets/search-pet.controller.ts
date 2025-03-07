import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error'
import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.string().optional(),
  energy_level: z.string().optional(),
  environment: z.string().optional(),
})

export async function searchPetController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { city, age, energy_level, environment, size } = querySchema.parse(
    req.query,
  )

  const searchPetUseCase = makeSearchPetUseCase()

  try {
    const { pets } = await searchPetUseCase.execute({
      city,
      age,
      energyLevel: energy_level,
      environment,
      size,
    })

    return reply.status(200).send({ pets })
  } catch (err) {
    console.error(err)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
