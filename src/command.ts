import { commandCache, commandClearCache } from "./command_cache.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
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
      description: "Fetch next 20 map names",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Fetch previous 20 map names",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Explore location",
      callback: commandExplore,
    },
    cache: {
      name: "cache",
      description: "Print current cache keys and their age",
      callback: commandCache,
    },
    clr: {
      name: "clr",
      description: "Clear cache",
      callback: commandClearCache,
    },
  };
}
