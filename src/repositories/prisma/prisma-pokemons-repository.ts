import { Prisma, Pokemon } from "@prisma/client";
import { prisma } from "src/lib/prisma";

import { PokemonsRepository } from "../pokemons-repository";

export class PrismaPokemonsRepository implements PokemonsRepository {
  async findById(id: string): Promise<Pokemon | null> {
    const pokemon = await prisma.pokemon.findUnique({
      where: {
        id,
      },
    });
    return pokemon;
  }

  async create(data: Prisma.PokemonUncheckedCreateInput): Promise<Pokemon> {
    const pokemon = await prisma.pokemon.create({
      data,
    });
    return pokemon;
  }
}
