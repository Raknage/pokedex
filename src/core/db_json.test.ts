// written by Gemini cli
// had to fix some path and type issues after

import { describe, it, expect, vi, beforeEach } from "vitest";
// Import all the functions we need to test or mock
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { loadFile, saveFile } from "./db_json.js";
import type { State } from "./state.js";

// This tells Vitest to replace the real 'fs/promises' with a mock version
vi.mock("node:fs/promises");

describe("loadFile error handling", () => {
  // This ensures that mocks are reset before each test run
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Test Case 1: The file contains corrupted JSON
  it("should throw an error if the file contains invalid JSON", async () => {
    // Arrange: Make readFile return a string of bad JSON
    const badJSON = '{"name": "Pikachu", "type": "Electric",}'; // Extra comma is invalid
    vi.mocked(readFile).mockResolvedValue(badJSON);

    // Act & Assert: Check that loadFile rejects because JSON.parse will fail.
    await expect(loadFile()).rejects.toThrow();
  });

  // Test Case 2: The file has incorrect permissions
  it("should throw an error if the file has permission errors", async () => {
    // Arrange: Make readFile throw a permission error
    const permissionError = new Error("EACCES: Permission denied");
    (permissionError as any).code = "EACCES"; // Add the error code
    vi.mocked(readFile).mockRejectedValue(permissionError);

    // Act & Assert: Check that loadFile rejects with the same error
    await expect(loadFile()).rejects.toThrow("EACCES: Permission denied");
  });
});

describe("saveFile", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call mkdir and writeFile with correct parameters on success", async () => {
    // Arrange
    const mockState: Partial<State> = {
      caughtPokemon: {
        pikachu: {
          name: "pikachu",
          height: 10,
          weight: 10,
          stats: [],
          types: [],
        } as any,
      },
    };
    const filePath = "./data/db.json";
    const expectedDir = "./data";
    const expectedData = JSON.stringify(mockState.caughtPokemon, null, 2);

    vi.mocked(mkdir).mockResolvedValue(undefined);
    vi.mocked(writeFile).mockResolvedValue(undefined);

    // Act
    const result = await saveFile(mockState as State, filePath);

    // Assert
    expect(result).toBe("DB saved");
    expect(mkdir).toHaveBeenCalledWith(expectedDir, { recursive: true });
    expect(writeFile).toHaveBeenCalledWith(filePath, expectedData, "utf8");
  });

  it('should return "Failed to save DB" when writeFile throws an error', async () => {
    // Arrange
    const mockState: Partial<State> = { caughtPokemon: {} };
    const saveError = new Error("Disk full");
    vi.mocked(mkdir).mockResolvedValue(undefined);
    vi.mocked(writeFile).mockRejectedValue(saveError);

    // Act
    const result = await saveFile(mockState as State, "./db.json");

    // Assert
    expect(result).toBe("Failed to save DB");
  });
});
