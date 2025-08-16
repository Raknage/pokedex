import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import type { caughtPokemon, State } from "./state.js";

const FILEPATH = "./db.json";

export async function saveFile(
  state: State,
  filePath: string = FILEPATH,
): Promise<string> {
  try {
    const data = JSON.stringify(state.caughtPokemon, null, 2);

    const dir = dirname(filePath);
    await mkdir(dir, { recursive: true });

    await writeFile(filePath, data, "utf8");

    return "DB saved";
  } catch (e) {
    console.log((e as Error).message);
    return "Failed to save DB";
  }
}

export async function loadFile(
  filePath: string = FILEPATH,
): Promise<caughtPokemon> {
  try {
    const data = await readFile(filePath, "utf8");

    return JSON.parse(data);
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("No save file found, starting a new pokedex.");
      return {};
    }
    console.error("The database file is corrupt or unreadable.");
    throw e as Error;
  }
}
