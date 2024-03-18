import { spec } from "node:test/reporters";

export interface PokemonType {
  slot: number;
  type: { name: string };
}

export interface PokemonSpecies {
  name: string;
  url: string;
  evolution_chain: {
    url: string;
  };
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
  species: { name: string; url: string };
}

export interface PokemonData {
  id: number;
  name: string;
  order: number;
  base_experience: number;
  weight: number;
  height: number;
  types: PokemonType[];
  species: { name: string; url: string; evolution_chain: string };
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
  // species: { name: string; url: string };
  evolutions?: string[] | null;
}

export interface EvolutionDetails {
  trigger: {
    name: string;
    url: string;
  };
}

export interface EvolutionNode {
  species: {
    name: string;
  };
  is_baby: boolean;
  evolves_to: ChainLink[];
}

export interface EvolutionChain {
  baby_trigger_item: any;
  chain: ChainLink;
  id: number;
}

export interface ChainLink {
  is_baby: boolean;
  species: PokemonSpecies;
  evolves_to: ChainLink[];
}