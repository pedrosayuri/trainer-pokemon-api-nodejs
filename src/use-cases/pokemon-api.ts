import axios, { AxiosResponse } from "axios";
import {
  EvolutionChain,
  EvolutionNode,
  PokemonData,
} from "../http/models/pokemon";

export async function fetchPokemonData(): Promise<PokemonData[]> {
  const response: AxiosResponse<{ results: { name: string; url: string }[] }> =
    await axios.get("https://pokeapi.co/api/v2/pokemon");

  const pokemonDetailsPromises: Promise<PokemonData>[] = response.data.results
    .slice(0, 10)
    .map((pokemon) => axios.get(pokemon.url).then((res) => res.data));
  const pokemonDetails: PokemonData[] = await Promise.all(
    pokemonDetailsPromises,
  );

  return pokemonDetails;
}

async function getEvolutionChain(
  pokemonId: number,
): Promise<EvolutionChain | null> {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/evolution-chain/${pokemonId}/`,
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter cadeia de evolução:", error);
    return null;
  }
}

export async function fetchAndDisplayEvolutionChain(
  pokemonId: number,
): Promise<EvolutionNode | null> {
  try {
    const evolutionChain = await getEvolutionChain(pokemonId);
    if (evolutionChain) {
      return evolutionChain.chain;
    } else {
      console.log(
        "Não foi possível encontrar a cadeia de evolução para o Pokémon.",
      );
      return null;
    }
  } catch (error) {
    console.error("Erro ao obter cadeia de evolução:", error);
    return null;
  }
}

// function displayEvolutionChain(node: EvolutionNode) {
//   console.log(node.species.name);
//   if (node.evolves_to.length > 0) {
//     console.log("Evolui para:");
//     node.evolves_to.forEach((evolution) => {
//       console.log(evolution.species.name);
//       if (evolution.evolves_to.length > 0) {
//         displayEvolutionChain(evolution);
//       }
//     });
//   }
// }
