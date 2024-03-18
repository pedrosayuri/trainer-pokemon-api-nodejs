import { CreateTeamPokemonUseCase } from "../create-team-pokemon";
import { PrismaPokemonsRepository } from "src/repositories/prisma/prisma-pokemons-repository";

export function makeCreatePokemonTeamUseCase() {
  const pokemonRepository = new PrismaPokemonsRepository();
  const useCase = new CreateTeamPokemonUseCase(pokemonRepository);

  return useCase;
}
