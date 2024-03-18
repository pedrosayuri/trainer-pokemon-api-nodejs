import axios, { AxiosResponse } from "axios";
import { PokemonData } from "../http/models/pokemon";

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
