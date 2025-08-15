import { State } from "./state";

export async function commandPokedex(state: State) {
  const pokedex = state.caughtPokemon;
  // if (!pokedex) {
  //   console.log(`You have no pokemon yet!`);
  //   return;
  // }

  console.log("Your Pokedex:");
  Object.keys(pokedex).forEach((p) => {
    console.log(`- ${p}`);
  });
}
