import { createInterface, type Interface } from "readline";
import { stdin as input, stdout as output } from "node:process";
import { getCommands } from "./command.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  interface: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationURL: string | null;
  prevLocationURL: string | null;
};

const prompt = "POKEDEX > ";

export function initState(): State {
  const rlInterface = createInterface({
    input,
    output,
    prompt,
  });
  const commands = getCommands();
  const pokeapi = new PokeAPI();

  return {
    interface: rlInterface,
    commands: commands,
    pokeapi: pokeapi,
    nextLocationURL: null,
    prevLocationURL: null,
  };
}
