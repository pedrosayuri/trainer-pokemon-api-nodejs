import {
  fetchEvolutionChain,
  fetchPokemonData,
  fetchPokemonSpecies,
} from "../../../use-cases/pokemon-api";
import { PokemonData, Pokemon } from "../../models/pokemon";

export async function listAllPokemonWithEvolutions(): Promise<Pokemon[]> {
  try {
    const pokemonDataList: PokemonData[] = await fetchPokemonData();
    const pokemonListPromises: Promise<Pokemon>[] = pokemonDataList.map(
      async (pokemonData) => {
        const speciesPokemon =
          (await fetchPokemonSpecies(pokemonData.id)) || "";
        const evolutionChain = await fetchEvolutionChain(speciesPokemon);
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
          // species: { name: pokemonData.species.name, url: pokemonData.species.url },
          evolutions: evolutionChain,
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
