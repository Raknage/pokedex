import { Cache, type CacheEntry } from "./pokecache.js";

export class PokeAPI {
  static readonly #baseURL = "https://pokeapi.co/api/v2/location-area/";
  // 1 min = 60000 ms; 60 min = 3600000 ms
  readonly cache = new Cache(60000);

  constructor() {}

  async fetchLocations(url = PokeAPI.#baseURL): Promise<ShallowLocations> {
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
    const url = `${PokeAPI.#baseURL}${area}/`;
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
