import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { getCommands } from "./command.js";

const prompt = "POKEDEX > ";

export function cleanInput(input: string): string[] {
  const arr = input
    .toLowerCase()
    .split(/[ \n\t]+/)
    .map((e) => e.trim())
    .filter((e) => {
      return e != "";
    });
  return arr;
}

export function startREPL() {
  const readlineInterace = readline.createInterface({
    input,
    output,
    prompt,
  });
  readlineInterace.prompt();
  readlineInterace.on("line", (line) => {
    const command = getCommands()[cleanInput(line)[0]];
    if (command) {
      command.callback(getCommands());
    }
    readlineInterace.prompt();
  });
}
