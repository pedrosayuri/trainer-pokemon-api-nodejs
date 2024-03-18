import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetTrainerProfileUseCase } from "src/use-cases/factories/make-get-trainer-profile-use-case";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const getTrainerProfile = makeGetTrainerProfileUseCase();

  const { trainer } = await getTrainerProfile.execute({
    trainerId: request.user.sub,
  });

  return reply.status(200).send({
    trainer: {
      ...trainer,
      password_hash: undefined,
    },
  });
}
