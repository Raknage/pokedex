import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log(`Welcome to the Pokedex!\nUsage:\n`);

  for (const key in commands) {
    const command = commands[key];
    console.log(`${command.name}: ${command.description}`);
  }
}
