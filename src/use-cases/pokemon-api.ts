import axios, { AxiosResponse } from "axios";
import {
  ChainLink,
  EvolutionChain,
  PokemonData,
  PokemonSpecies,
} from "../http/models/pokemon";

export async function fetchPokemonData(): Promise<PokemonData[]> {
  try {
    const response: AxiosResponse<{
      results: { name: string; url: string }[];
    }> = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=16&offset=0");

    const pokemonDetailsPromises: Promise<PokemonData>[] =
      response.data.results.map((pokemon) =>
        axios.get(pokemon.url).then((res) => res.data),
      );
    const pokemonDetails: PokemonData[] = await Promise.all(
      pokemonDetailsPromises,
    );

    return pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
}

export async function fetchEvolutionChain(
  pokemonEvolution: string,
): Promise<string[] | null> {
  try {
    const response = await axios.get<EvolutionChain>(pokemonEvolution);

    function extractPokemonNames(chainLink: ChainLink): string[] {
      const names: string[] = [];
      if (chainLink.species && chainLink.species.name) {
        names.push(chainLink.species.name);
      }
      if (chainLink.evolves_to && chainLink.evolves_to.length > 0) {
        chainLink.evolves_to.forEach((link) => {
          names.push(...extractPokemonNames(link));
        });
      }
      return names;
    }

    const evolutionNames: string[] = extractPokemonNames(response.data.chain);
    console.log("Pokémon Evolution Names:", evolutionNames);

    return evolutionNames;
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    return null;
  }
}

export async function fetchPokemonSpecies(
  pokemonId: number,
): Promise<string | null> {
  try {
    const response = await axios.get<PokemonSpecies>(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`,
    );

    if (response.data.evolution_chain) {
      const evolutionChainUrl = response.data.evolution_chain.url;
      console.log("Evolution Chain URL:", evolutionChainUrl);
      return evolutionChainUrl;
    } else {
      console.error(
        `No evolution chain found for Pokémon with ID ${pokemonId}.`,
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching Pokémon species:", error);
    return null;
  }
}
