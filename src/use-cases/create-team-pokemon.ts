import { Pokemon } from "@prisma/client";
import { PokemonsRepository } from "../repositories/pokemons-repository";

interface CreateTeamPokemonUseCaseRequest {
  trainerId: string;
  teamId: string;
  pokemonName: string;
}

interface CreateTeamPokemonUseCaseResponse {
  pokemon: Pokemon;
}

export class CreateTeamPokemonUseCase {
  constructor(private pokemonRepository: PokemonsRepository) {}

  async execute({
    teamId,
    pokemonName,
    trainerId,
  }: CreateTeamPokemonUseCaseRequest): Promise<CreateTeamPokemonUseCaseResponse> {
    const pokemon = await this.pokemonRepository.create({
      team_id: teamId,
      pokemon_name: pokemonName,
      created_at: new Date(),
      trainer_id: trainerId,
    });

    return {
      pokemon,
    };
  }
}
