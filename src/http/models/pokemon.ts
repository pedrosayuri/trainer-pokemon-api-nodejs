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

export interface Evolution {
  id: number;
  name: string;
  order: number;
  base_experience: number;
  weight: number;
  height: number;
  image: string;
  types: { slot: number; type_name: string }[];
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
  evolutions?: Evolution[] | null;
}

export interface EvolutionDetails {
  trigger: {
    name: string;
    url: string;
  };
}

export interface EvolutionNode {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionNode[];
  evolution_details: EvolutionDetails[];
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionNode;
}
