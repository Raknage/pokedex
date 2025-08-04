import { createInterface, type Interface } from "readline";
import { stdin as input, stdout as output } from "node:process";
import { getCommands } from "./command.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
  interface: Interface;
  commands: Record<string, CLICommand>;
};

const prompt = "POKEDEX > ";

export function initState(): State {
  const rlInterface = createInterface({
    input,
    output,
    prompt,
  });
  const commands = getCommands();

  return {
    interface: rlInterface,
    commands: commands,
  };
}
