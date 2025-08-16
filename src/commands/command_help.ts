import type { State } from "../state.js";

export async function commandHelp(state: State) {
  console.log(`Welcome to the Pokedex!\nUsage:\n`);

  for (const key in state.commands) {
    const command = state.commands[key];
    console.log(`${command.name}: ${command.description}`);
  }
}
