import { State } from "./state";

export async function commandCatch(state: State, pokemon: string) {
  console.log(`Throwing a pokeball at ${pokemon}...`);
  const pokemonData = await state.pokeapi.fetchPokemon(pokemon);
  const baseExperience = pokemonData.base_experience * 2;
  const rand = Math.random() * 1000;

  console.log(`Capture chance ${baseExperience} vs ${rand}`);

  // pikachu 112
  if (baseExperience > rand) {
    console.log(`${pokemon} escaped!`);
    return;
  }

  state.caughtPokemon[pokemonData.name] = pokemonData;

  console.log(`${pokemon} was caught!`);
}
