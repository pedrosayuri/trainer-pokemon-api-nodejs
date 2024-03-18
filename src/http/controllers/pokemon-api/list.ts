// import axios, { AxiosResponse } from "axios";
// import { FastifyRequest, FastifyReply } from "fastify";

// interface PokemonType {
//   slot: number;
//   type: { name: string };
// }

// interface PokemonData {
//   id: number;
//   name: string;
//   order: number;
//   base_experience: number;
//   weight: number;
//   height: number;
//   types: PokemonType[];
// }

// interface Pokemon {
//   id: number;
//   name: string;
import { fetchPokemonData } from "../../../use-cases/pokemon-api";
import { PokemonData, Pokemon } from "../../models/pokemon";

export async function listPokemon(): Promise<Pokemon[]> {
  try {
    const pokemonDataList: PokemonData[] = await fetchPokemonData();
    const pokemonListPromises: Promise<Pokemon>[] = pokemonDataList.map(
      async (pokemonData) => {
        const pokemon: Pokemon = {
          id: pokemonData.id,
          name: pokemonData.name,
          order: pokemonData.order,
          base_experience: pokemonData.base_experience,
          weight: pokemonData.weight,
          height: pokemonData.height,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`,
          types: pokemonData.types.map((type) => ({
            slot: type.slot,
            type_name: type.type.name,
          })),
        };
        return pokemon;
      },
    );
    const pokemonList: Pokemon[] = await Promise.all(pokemonListPromises);
    return pokemonList;
  } catch (error) {
    console.error("Error listing Pokémon:", error);
    throw error;
  }
}
