import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { makeCreatePokemonTeamUseCase } from "src/use-cases/factories/make-crate-pokemon-team-use-case";
import { makeGetTeamUseCase } from "src/use-cases/factories/make-get-team-use-case";
import { makeGetNumberPokemonsTeamUseCase } from "src/use-cases/factories/make-get-number-pokemons-team-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPokemonTeamBodySchema = z.object({
    pokemonName: z.string(),
  });

  try {
    const { pokemonName } = createPokemonTeamBodySchema.parse(request.body);

    const teamIdResult = await getTeamId(request.user.sub);

    const isTeamFullResponse = await isTeamFull(teamIdResult, request.user.sub);

    if (isTeamFullResponse) {
      return reply.status(400).send({ message: "O time já está cheio" });
    }

    const createPokemonTeamUseCase = makeCreatePokemonTeamUseCase();

    await createPokemonTeamUseCase.execute({
      trainerId: request.user.sub,
      pokemonName,
      teamId: teamIdResult,
    });

    return reply.status(201).send();
  } catch (error) {
    console.error("Error creating Pokémon team:", error);
    return reply.status(400).send({ message: "Verifique os dados novamente." });
  }
}

async function getTeamId(trainerId: string) {
  const getTeamUseCase = makeGetTeamUseCase();

  const teamResponse = await getTeamUseCase.execute(trainerId);

  return teamResponse.id;
}

async function isTeamFull(teamId: string, trainerId: string): Promise<boolean> {
  const getNumberPokemonsTeamUseCase = makeGetNumberPokemonsTeamUseCase();

  const numberOfPokemons = await getNumberPokemonsTeamUseCase.execute(
    teamId,
    trainerId,
  );

  return numberOfPokemons > 4;
}
