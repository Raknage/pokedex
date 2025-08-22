import type { State } from "../state.js";

export async function commandHelp(state: State): Promise<string> {
  let output = "";
  output += `Welcome to the Pokedex!\nUsage:\n`;

  for (const key in state.commands) {
    const command = state.commands[key];
    output += `${command.name}: ${command.description}\n`;
  }

  return output;
}
