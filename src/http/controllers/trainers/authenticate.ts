import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialsError } from "src/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "src/use-cases/factories/make-authenticate-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    username: z.string(),
    password: z.string().min(6),
  });

  const { username, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { trainer } = await authenticateUseCase.execute({
      username,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: trainer.id,
        },
      },
    );

    return reply.status(200).send({
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
