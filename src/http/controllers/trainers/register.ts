import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeRegisterUseCase } from "src/use-cases/factories/make-register-use-case";
import { TrainerAlreadyExistsError } from "src/use-cases/errors/trainer-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string().min(6),
  });

  const { username, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ username, password });
  } catch (error) {
    if (error instanceof TrainerAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
