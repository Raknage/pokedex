import { ShallowLocations } from "src/core/pokeapi.js";
import { State } from "../state.js";

export async function commandMap(state: State): Promise<string> {
  const locations = await state.pokeapi.fetchLocations(state.nextLocationURL);
  state.nextLocationURL = locations.next;
  state.prevLocationURL = locations.previous;

  return formatLocations(locations);
}

export async function commandMapb(state: State): Promise<string> {
  if (!state.prevLocationURL) {
    return "you're on the first page";
  }

  const locations = await state.pokeapi.fetchLocations(state.prevLocationURL);

  state.nextLocationURL = locations.next;
  state.prevLocationURL = locations.previous;

  return formatLocations(locations);
}

async function formatLocations(locations: ShallowLocations): Promise<string> {
  let output = "";
  for (const area of locations["results"]) {
    output += `${area.name}\n`;
  }

  return output;
}
