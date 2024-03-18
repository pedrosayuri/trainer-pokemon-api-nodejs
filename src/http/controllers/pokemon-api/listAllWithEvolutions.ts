import {
  fetchPokemonData,
  fetchAndDisplayEvolutionChain,
} from "../../../use-cases/pokemon-api";
import {
  PokemonData,
  Pokemon,
  Evolution,
  EvolutionNode,
} from "../../models/pokemon";

export async function listAllPokemonWithEvolutions(): Promise<Pokemon[]> {
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
        const evolutionChain = await fetchAndDisplayEvolutionChain(
          pokemonData.id,
        );
        if (evolutionChain) {
          pokemon.evolutions = mapEvolutionChainToEvolution(evolutionChain);
        }
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

function mapEvolutionChainToEvolution(
  evolutionChain: EvolutionNode,
): Evolution[] {
  const evolutions: Evolution[] = [];

  function traverse(node: EvolutionNode) {
    const evolution: Evolution = {
      id: getIdFromUrl(node.species.url),
      name: node.species.name,
      order: 0, // Não temos a informação de ordem disponível nesta estrutura
      base_experience: 0, // Não temos a informação de experiência base disponível nesta estrutura
      weight: 0, // Não temos a informação de peso disponível nesta estrutura
      height: 0, // Não temos a informação de altura disponível nesta estrutura
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getIdFromUrl(node.species.url)}.png`,
      types: [], // Não temos a informação de tipos disponível nesta estrutura
    };

    evolutions.push(evolution);

    // Verificar se há evoluções posteriores
    if (node.evolves_to.length > 0) {
      node.evolves_to.forEach((evolutionNode) => traverse(evolutionNode));
    }
  }

  traverse(evolutionChain);

  return evolutions;
}

function getIdFromUrl(url: string): number {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2]);
}
