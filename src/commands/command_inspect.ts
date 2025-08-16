import { State } from "../state";

export async function commandInspect(
  state: State,
  pokemonName: string,
): Promise<string> {
  const pokemon = state.caughtPokemon[pokemonName];
  if (!pokemon) {
    return `You have not caught ${pokemonName} yet!`;
  }

  let output = "";

  output += `Name: ${pokemon.name}
Height: ${pokemon.height}
Weight: ${pokemon.weight}
Stats:
  -hp: ${pokemon.stats[0].base_stat}
  -attack: ${pokemon.stats[1].base_stat}
  -defense: ${pokemon.stats[2].base_stat}
  -special-attack: ${pokemon.stats[3].base_stat}
  -special-defense: ${pokemon.stats[4].base_stat}
  -speed: ${pokemon.stats[5].base_stat}
Types:\n`;

  pokemon.types.forEach((t) => {
    output += `  - ${t.type.name}\n`;
  });

  return output;
}
