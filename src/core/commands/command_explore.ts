import { State } from "../state.js";

export async function commandExplore(
  state: State,
  area: string,
): Promise<string> {
  if (!area) {
    return `Please specify area: explore <area name>`;
  }

  console.log(`Exploring ${area}...`);

  const data = await state.pokeapi.fetchArea(area);
  const pokemonEncounters = data.pokemon_encounters;
  let output = "";

  output += `Found Pokemon:\n`;
  for (const encounter of pokemonEncounters) {
    output += `- ${encounter.pokemon.name}\n`;
  }

  return output;
}
