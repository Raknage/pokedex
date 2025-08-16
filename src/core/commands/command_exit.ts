import { State } from "../state.js";

export async function commandExit(state: State): Promise<string> {
  // console.log("Closing the Pokedex... Goodbye!");
  state.interface.close();
  state.pokeapi.cache.stopReapLoop();
  setImmediate(() => process.exit(0));
  return "Closing the Pokedex... Goodbye!";
}
