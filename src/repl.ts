import { type State } from "./state";

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

export async function startREPL(state: State) {
  state.interface.prompt();
  state.interface.on("line", (line) => {
    const command = state.commands[cleanInput(line)[0]];
    if (command) {
      command.callback(state);
    }
    state.interface.prompt();
  });
}
