export interface PokemonType {
  slot: number;
  type: { name: string };
}

export interface PokemonData {
  id: number;
  name: string;
  order: number;
  base_experience: number;
  weight: number;
  height: number;
  types: PokemonType[];
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  order: number;
  base_experience: number;
  weight: number;
  height: number;
  image: string;
  types: { slot: number; type_name: string }[];
}
