import { State } from "./state";

type LocationArea = {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      name: string;
      url: string;
    },
  ];
};

export async function commandMap(state: State) {
  try {
    const url = "https://pokeapi.co/api/v2/location-area/";
    const limit = 5;
    const offset = 0;
    const finalURL = `${url}?limit=${limit}&offset=${offset}`;
    const res = await fetch(finalURL, {
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
    const data: LocationArea = await res.json();
    for (const area of data["results"]) {
      console.log(area.name);
    }
  } catch (e) {
    console.error(`Fetch failed: ${e}`);
  }
}
