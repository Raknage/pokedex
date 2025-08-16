import { State } from "../state";

export async function commandCache(state: State): Promise<string> {
  let output = "";

  for await (const [key, value] of state.pokeapi.cache.getCacheEntries()) {
    output += `key: "${key}" age: ${Date.now() - value.createdAt}\n`;
  }

  return output;
}

export async function commandClearCache(state: State) {
  state.pokeapi.cache.clearCache();
  return "Cache cleared";
}
