import { randomUUID } from "node:crypto";
import { Pokemon, Prisma } from "@prisma/client";
import { PokemonsRepository } from "../pokemons-repository";

export class InMemoryPokemonsRepository implements PokemonsRepository {
  public items: Pokemon[] = [];

  async findById(id: string) {
    const pokemon = this.items.find((item) => item.id === id);

    if (!pokemon) {
      return null;
    }

    return pokemon;
  }

  async create(data: Prisma.PokemonUncheckedCreateInput) {
    const pokemon: Pokemon = {
      id: randomUUID(),
      trainer_id: data.trainer_id,
      pokemon_name: data.pokemon_name,
      team_id: data.team_id || null,
      created_at: new Date(),
    };

    this.items.push(pokemon);

    return pokemon;
  }
}
