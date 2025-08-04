import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

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
    const cleanArr = cleanInput(line);
    if (cleanArr.length === 0) {
      readlineInterace.prompt();
      return;
    }
    console.log(`Your command was: ${cleanArr[0]}`);
    readlineInterace.prompt();
  });
}
