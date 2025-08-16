import {
  createInterface,
  type Interface,
  type Completer,
} from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { getCommands } from "./commands/commands.js";
import { PokeAPI, PokemonData } from "./pokeapi.js";
import { loadFile } from "./db_json.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<string>;
};

export type caughtPokemon = Record<string, PokemonData>;

export type State = {
  interface: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationURL: string;
  prevLocationURL: string;
  caughtPokemon: caughtPokemon;
};

const prompt = "POKEDEX > ";
const commands = getCommands();

const completer: Completer = (line: string) => {
  const completions = Object.keys(commands);
  const hits = completions.filter((c) => c.startsWith(line));
  return [hits.length ? hits : completions, line];
};

export async function initState(cacheDelay: number): Promise<State> {
  const rlInterface = createInterface({
    input,
    output,
    prompt,
    completer,
  });

  return {
    interface: rlInterface,
    commands: commands,
    pokeapi: new PokeAPI(cacheDelay),
    nextLocationURL: "",
    prevLocationURL: "",
    caughtPokemon: await loadFile(),
  };
}
