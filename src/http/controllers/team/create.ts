import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreateTeamUseCase } from "src/use-cases/factories/make-crate-team-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTeamBodySchema = z.object({
    teamName: z.string(),
  });

  const { teamName } = createTeamBodySchema.parse(request.body);

  const createTeamUseCase = makeCreateTeamUseCase();

  await createTeamUseCase.execute({
    trainerId: request.user.sub,
    teamName,
  });

  return reply.status(201).send();
}
