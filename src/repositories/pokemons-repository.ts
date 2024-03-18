import { Prisma, Pokemon } from "@prisma/client";

export interface PokemonsRepository {
  findById(id: string): Promise<Pokemon | null>;
  create(data: Prisma.PokemonUncheckedCreateInput): Promise<Pokemon>;
}
