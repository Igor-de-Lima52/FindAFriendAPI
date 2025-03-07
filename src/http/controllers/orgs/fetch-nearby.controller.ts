import { makeFetchNearbyOrgsUseCase } from '@/use-cases/factories/make-fetch-nearby-orgs-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export async function fetchNearbyController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const query = querySchema.parse(req.query)

  const fetchNearbyUseCase = makeFetchNearbyOrgsUseCase()

  try {
    const { orgs } = await fetchNearbyUseCase.execute({
      userLatitude: query.latitude,
      userLongitude: query.longitude,
    })

    return reply.status(200).send({ orgs })
  } catch (err) {
    console.error(err)

    return reply.status(500).send({ message: 'Internal server error.' })
  }
}
