import { Cache, type CacheEntry } from "./pokecache.js";

export class PokeAPI {
  static readonly #baseURL = "https://pokeapi.co/api/v2/";
  // 1 min = 60000 ms; 60 min = 3600000 ms
  readonly cache = new Cache(60000);

  constructor() {}

  async fetchLocations(): Promise<ShallowLocations> {
    const url = `${PokeAPI.#baseURL}location-area/`;
    const cacheHit: CacheEntry<ShallowLocations> | undefined =
      this.cache.get(url);
    if (cacheHit) {
      return cacheHit.val;
    }
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const data = await res.json();
    this.cache.add(url, data);
    return data;
  }

  async fetchArea(area: string): Promise<AreaData> {
    const url = `${PokeAPI.#baseURL}location-area/${area}/`;
    const cacheHit: CacheEntry<AreaData> | undefined = this.cache.get(url);
    if (cacheHit) {
      return cacheHit.val;
    }
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const data = await res.json();
    this.cache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemon: string): Promise<PokemonData> {
    const url = `${PokeAPI.#baseURL}pokemon/${pokemon}/`;
    const cacheHit: CacheEntry<PokemonData> | undefined = this.cache.get(url);
    if (cacheHit) {
      return cacheHit.val;
    }
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const data = await res.json();
    this.cache.add(url, data);
    return data;
  }

  // async fetchLocation(name: string): Promise<Location> {}
}

// Location types

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Location[];
};

export type Location = {
  name: string;
  url: string;
};

// Area types

export type AreaData = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: Location;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
};

export type EncounterMethodRate = {
  encounter_method: EncounterMethod;
  version_details: VersionDetail[];
};

export type EncounterMethod = {
  name: string;
  url: string;
};

export type VersionDetail = {
  rate: number;
  version: Version;
};

export type Version = {
  name: string;
  url: string;
};

export type Name = {
  language: Language;
  name: string;
};

export type Language = {
  name: string;
  url: string;
};

export type PokemonEncounter = {
  pokemon: Pokemon;
  version_details: VersionDetail2[];
};

export type Pokemon = {
  name: string;
  url: string;
};

export type VersionDetail2 = {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version2;
};

export type EncounterDetail = {
  chance: number;
  condition_values: any[];
  max_level: number;
  method: Method;
  min_level: number;
};

export type Method = {
  name: string;
  url: string;
};

export type Version2 = {
  name: string;
  url: string;
};

// Pokemon interfaces

export interface PokemonData {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  forms: Form[];
  game_indices: Index[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Mfe[];
  name: string;
  order: number;
  past_abilities: PastAbility[];
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability: Ability2;
  is_hidden: boolean;
  slot: number;
}

export interface Ability2 {
  name: string;
  url: string;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface Form {
  name: string;
  url: string;
}

export interface Index {
  game_index: number;
  version: Version;
}

export interface HeldItem {
  item: Item;
  version_details: ItemVersionDetail[];
}

export interface Item {
  name: string;
  url: string;
}

export interface ItemVersionDetail {
  rarity: number;
  version: Version2;
}

export interface Mfe {
  move: Move;
  version_group_details: VersionGroupDetail[];
}

export interface Move {
  name: string;
  url: string;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  order?: number;
  version_group: VersionGroup;
}

export interface MoveLearnMethod {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export interface PastAbility {
  abilities: Ability3[];
  generation: Generation;
}

export interface Ability3 {
  ability: any;
  is_hidden: boolean;
  slot: number;
}

export interface Generation {
  name: string;
  url: string;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: Other;
  versions: Versions;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
  showdown: Showdown;
}

export interface DreamWorld {
  front_default: string;
  front_female: any;
}

export interface Home {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface Showdown {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface Versions {
  "generation-i": GenerationI;
  "generation-ii": GenerationIi;
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-v": GenerationV;
  "generation-vi": GenerationVi;
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

export interface GenerationI {
  "red-blue": RedBlue;
  yellow: Yellow;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface Yellow {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Silver;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

export interface Silver {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

export interface GenerationIii {
  emerald: Emerald;
  "firered-leafgreen": FireredLeafgreen;
  "ruby-sapphire": RubySapphire;
}

export interface Emerald {
  front_default: string;
  front_shiny: string;
}

export interface FireredLeafgreen {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface RubySapphire {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface GenerationIv {
  "diamond-pearl": DiamondPearl;
  "heartgold-soulsilver": HeartgoldSoulsilver;
  platinum: Platinum;
}

export interface DiamondPearl {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface HeartgoldSoulsilver {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface Platinum {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface GenerationV {
  "black-white": BlackWhite;
}

export interface BlackWhite {
  animated: Animated;
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface Animated {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface GenerationVi {
  "omegaruby-alphasapphire": OmegarubyAlphasapphire;
  "x-y": XY;
}

export interface OmegarubyAlphasapphire {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface XY {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface GenerationVii {
  icons: Icons;
  "ultra-sun-ultra-moon": UltraSunUltraMoon;
}

export interface Icons {
  front_default: string;
  front_female: any;
}

export interface UltraSunUltraMoon {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface GenerationViii {
  icons: Icons2;
}

export interface Icons2 {
  front_default: string;
  front_female: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Stat2;
}

export interface Stat2 {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: Type2;
}

export interface Type2 {
  name: string;
  url: string;
}
