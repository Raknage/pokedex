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
    const args = cleanInput(line);
    const command = state.commands[args[0]];
    if (command) {
      command.callback(state, ...args.slice(1));
    }
    state.interface.prompt();
  });
}
