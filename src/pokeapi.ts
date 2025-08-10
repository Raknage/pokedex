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

    const data: ShallowLocations = await res.json();
    this.cache.add(url, data);
    return data;
  }

  // async fetchLocation(name: string): Promise<Location> {}
}

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

// export type LocationArea = {
//   count: number;
//   next: string;
//   previous: string;
//   results: [
//     {
//       name: string;
//       url: string;
//     },
//   ];
// };
