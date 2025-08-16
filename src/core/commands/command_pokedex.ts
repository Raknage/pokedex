import { State } from "../state.js";

export async function commandPokedex(state: State): Promise<string> {
  const pokedex = state.caughtPokemon;
  let output = "";
  // if (!pokedex) {
  //   console.log(`You have no pokemon yet!`);
  //   return;
  // }

  output += "Your Pokedex:\n";

  Object.keys(pokedex).forEach((p) => {
    output += `- ${p}\n`;
  });

  return output;
}
