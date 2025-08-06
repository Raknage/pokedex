import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Prints usage information for pokedex",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Fetch map names, 20 at a time",
      callback: commandMap,
    },
  };
}
