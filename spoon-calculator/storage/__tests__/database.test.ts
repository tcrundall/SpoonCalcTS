import {
  createActivitiesTable,
  initialiseDatabase,
  saveActivity,
} from "../database.native";
import { expect, describe, vi, it, beforeEach } from "vitest";

const mocks = vi.hoisted(() => {
  return {
    execAsync: vi.fn(),
    withTransactionAsync: (func: any) => {
      return func();
    },
    getAllAsync: () => [],
  };
});

vi.mock("expo-sqlite", () => ({
  openDatabaseSync: () => {
    return {
      execAsync: mocks.execAsync,
      withTransactionAsync: mocks.withTransactionAsync,
      getAllAsync: mocks.getAllAsync,
    };
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("database", () => {
  it("creates a table if not exists upon initialisation", async () => {
    await initialiseDatabase();
    expect(mocks.execAsync).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining("CREATE TABLE IF NOT EXISTS"),
    );
  });

  it("creates activity table if not exists", async () => {
    await createActivitiesTable();
    expect(mocks.execAsync).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining("create table if not exists activities"),
    );
  });
});
