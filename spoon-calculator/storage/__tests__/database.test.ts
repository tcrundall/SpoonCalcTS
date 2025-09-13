import { initialiseDatabase } from "../database.native";
import { expect, describe, vi, it } from "vitest";

const mocks = vi.hoisted(() => {
  return {
    execAsync: vi.fn(),
  };
});

vi.mock("expo-sqlite", () => ({
  openDatabaseSync: () => {
    return {
      execAsync: mocks.execAsync,
    };
  },
  initialiseDatabase: () => {
    console.log("Mocked initialise database!");
  },
}));

describe("database", () => {
  it("creates a table if not exists upon initialisation", async () => {
    console.log("Hello from test");
    await initialiseDatabase();
    expect(mocks.execAsync).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining("CREATE TABLE IF NOT EXISTS"),
    );
  });
});
