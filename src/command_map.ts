import { State } from "./state";

export async function commandMap(state: State) {
  const url = state.nextLocationURL ? state.nextLocationURL : undefined;
  const locations = await state.pokeapi.fetchLocations(url);
  state.nextLocationURL = locations.next;
  state.prevLocationURL = locations.previous;
  for (const area of locations["results"]) {
    console.log(area.name);
  }
}

export async function commandMapb(state: State) {
  const url = state.prevLocationURL ? state.prevLocationURL : undefined;
  if (!url) {
    console.log("you're on the first page");
    return;
  }

  const locations = await state.pokeapi.fetchLocations(url);

  state.nextLocationURL = locations.next;
  state.prevLocationURL = locations.previous;
  for await (const area of locations["results"]) {
    console.log(area.name);
  }
}
