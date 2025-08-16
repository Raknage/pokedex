import { commandCache, commandClearCache } from "./command_cache.js";
import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandPokedex } from "./command_pokedex.js";
import { CLICommand } from "../state.js";

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
      description: "Usage: Explore <location>",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Usage: catch <pokemon>",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Usage: inspect <pokemon>",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "List caught Pokemon",
      callback: commandPokedex,
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
