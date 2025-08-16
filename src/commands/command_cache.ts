import { State } from "../state";

export async function commandCache(state: State) {
  for (const [key, value] of state.pokeapi.cache.getCacheEntries()) {
    console.log(`key: "${key}" age: ${Date.now() - value.createdAt}`);
  }
}
export async function commandClearCache(state: State) {
  state.pokeapi.cache.clearCache();
}
