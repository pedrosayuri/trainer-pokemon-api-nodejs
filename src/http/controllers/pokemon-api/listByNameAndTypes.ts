import { fetchPokemonData } from "../../../use-cases/pokemon-api";
import { PokemonData, Pokemon } from "../../models/pokemon";

interface FilterOptions {
  name?: string;
  types?: string[];
}

export async function listByNameAndTypes(
  options?: FilterOptions,
): Promise<Pokemon[]> {
  try {
    const pokemonDataList: PokemonData[] = await fetchPokemonData();
    const filteredPokemonDataList: PokemonData[] = filterPokemonDataList(
      pokemonDataList,
      options,
    );

    const pokemonListPromises: Promise<Pokemon>[] = filteredPokemonDataList.map(
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

function filterPokemonDataList(
  pokemonDataList: PokemonData[],
  options?: FilterOptions,
): PokemonData[] {
  if (!options || (!options.name && !options.types)) {
    return pokemonDataList;
  }

  let filteredList: PokemonData[] = pokemonDataList;

  if (options.name) {
    const name = options.name.toLowerCase();
    filteredList = filteredList.filter((pokemonData) =>
      pokemonData.name.toLowerCase().includes(name),
    );
  }

  if (options.types && options.types.length > 0) {
    const types = options.types.map((type) => type.toLowerCase());
    filteredList = filteredList.filter((pokemonData) =>
      pokemonData.types.some((pokemonType) =>
        types.includes(pokemonType.type.name.toLowerCase()),
      ),
    );
  }

  return filteredList;
}
