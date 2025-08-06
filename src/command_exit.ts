import { State } from "./state";

export async function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  state.interface.close();
  process.exit(0);
}
