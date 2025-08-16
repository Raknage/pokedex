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
  state.interface.on("line", async (line) => {
    const args = cleanInput(line);

    if (args.length === 0) {
      state.interface.prompt();
      return;
    }

    const command = state.commands[args[0]];

    if (!command) {
      console.log(`Type "help" for a list of commands.`);
      state.interface.prompt();
      return;
    }

    try {
      await command.callback(state, ...args.slice(1));
    } catch (e) {
      console.log(`${(e as Error).name}: ${(e as Error).message}`);
    }
    state.interface.prompt();
  });
}
