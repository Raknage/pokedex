import { saveFile } from "../db_json.js";
import { State } from "../state.js";

export async function commandCatch(
  state: State,
  pokemon: string,
): Promise<string> {
  console.log(`Throwing a Pokeball at ${pokemon}...`);

  const pokemonData = await state.pokeapi.fetchPokemon(pokemon);
  const baseExperience = pokemonData.base_experience * 2;
  const rand = Math.random() * 1000;

  console.log(`Capture chance ${baseExperience} vs ${rand}`);

  // pikachu 112
  if (baseExperience > rand) {
    return `${pokemon} escaped!`;
  }

  state.caughtPokemon[pokemonData.name] = pokemonData;
  saveFile(state);

  return `${state.caughtPokemon[pokemon].name} was caught!`;
}
