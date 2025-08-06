export class PokeAPI {
  static readonly #baseURL = "https://pokeapi.co/api/v2/location-area/";

  constructor() {}

  async fetchLocations(url = PokeAPI.#baseURL): Promise<ShallowLocations> {
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
