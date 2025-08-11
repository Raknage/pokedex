import { State } from "./state";

export async function commandExplore(state: State, area: string) {
  if (!area) {
    console.log(`Please specify area: explore <area name>`);
    return;
  }

  console.log(`Exploring ${area}...`);

  const data = await state.pokeapi.fetchArea(area);
  const pokemonEncounters = data.pokemon_encounters;

  console.log(`Found Pokemon:`);
  for (const encounter of pokemonEncounters) {
    console.log(`- ${encounter.pokemon.name}`);
  }
}
