import { expect, describe, it, beforeEach } from "vitest";
import { CreateTeamPokemonUseCase } from "./create-team-pokemon";
import { InMemoryPokemonsRepository } from "src/repositories/in-memory/in-memory-pokemons-repository";

let pokemonRepository: InMemoryPokemonsRepository;
let sut: CreateTeamPokemonUseCase;

describe("Create Pokemon Team Use Case", () => {
  beforeEach(() => {
    pokemonRepository = new InMemoryPokemonsRepository();
    sut = new CreateTeamPokemonUseCase(pokemonRepository);
  });

  it("should be able to create pokemon team", async () => {
    const { pokemon } = await sut.execute({
      teamName: "Team Name",
      pokemonName: "Pikachu",
      teamId: "Team_ID",
      trainerId: "Trainer_ID",
    });

    expect(pokemon.id).toEqual(expect.any(String));
  });

  it("should associate team with team", async () => {
    const { pokemon } = await sut.execute({
      teamName: "Team Name",
      pokemonName: "Pikachu",
      teamId: "Team_ID",
      trainerId: "Trainer_ID",
    });

    expect(pokemon.team_id).toEqual("Team_ID");
  });
});
