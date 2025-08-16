import { State } from "../state.js";

export async function commandInspect(
  state: State,
  pokemonName: string,
): Promise<string> {
  const pokemon = state.caughtPokemon[pokemonName];
  if (pokemon === undefined) {
    return `You have not caught ${pokemonName} yet!`;
  }

  if (!pokemon.stats || pokemon.stats.length < 6) {
    return `Could not retrieve full stats for ${pokemonName}.`;
  }

  const [hp, att, def, spAtt, spDef, spd] = pokemon.stats;

  let output = "";

  output += `Name: ${pokemon.name}
Height: ${pokemon.height}
Weight: ${pokemon.weight}
Stats:
  -hp: ${hp.base_stat}
  -attack: ${att.base_stat}
  -defense: ${def.base_stat}
  -special-attack: ${spAtt.base_stat}
  -special-defense: ${spDef.base_stat}
  -speed: ${spd.base_stat}
Types:\n`;

  pokemon.types.forEach((t) => {
    output += `  - ${t.type.name}\n`;
  });

  return output;
}
