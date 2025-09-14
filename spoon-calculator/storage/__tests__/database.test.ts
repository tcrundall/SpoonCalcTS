import dayjs from "dayjs";
import {
  Activity,
  NewActivity,
  createActivitiesTable,
  deleteActivity,
  initialiseDatabase,
  listActivities,
  saveActivity,
  updateActivity,
} from "../database.native";
import { expect, describe, vi, it, beforeEach } from "vitest";

const mocks = vi.hoisted(() => {
  return {
    execAsync: vi.fn(),
    withTransactionAsync: (func: any) => {
      return func();
    },
    getAllAsync: vi.fn((): Activity[] => []),
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

const getActivity = (): NewActivity => ({
  name: "name",
  cognitiveLoad: 1,
  physicalLoad: 2,
  type: "leisure",
  qualifier: "screen",
  startDate: dayjs().format(),
  endDate: dayjs().add(1, "day").format(),
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("database", () => {
  it("creates a table if not exists upon initialisation", async () => {
    // arrange + act
    await initialiseDatabase();

    // assert
    expect(mocks.execAsync).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining("CREATE TABLE IF NOT EXISTS"),
    );
  });

  it("creates activity table if not exists", async () => {
    // arrange + act
    await createActivitiesTable();

    // assert
    expect(mocks.execAsync).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining("create table if not exists activities"),
    );
  });

  it("saves an activity", async () => {
    // arrange
    const myActivity = getActivity();

    // act
    await saveActivity(myActivity);

    // assert
    expect(mocks.execAsync).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining("insert into activities"),
    );
    for (const key of Object.keys(myActivity) as Array<keyof NewActivity>) {
      expect(mocks.execAsync).toHaveBeenCalledExactlyOnceWith(
        expect.stringContaining(String(myActivity[key])),
      );
    }
  });

  it("updates an activity", () => {
    // arrange
    const updatedActivity = {
      ...getActivity(),
      name: "New name",
      id: "some-id",
    };

    // act
    updateActivity(updatedActivity);

    // assert
    expect(mocks.execAsync).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining("update activities"),
    );
    for (const key of Object.keys(updatedActivity) as Array<keyof Activity>) {
      expect(mocks.execAsync).toHaveBeenCalledExactlyOnceWith(
        expect.stringContaining(String(updatedActivity[key])),
      );
    }
  });

  it("lists all activities", () => {
    // arrange + act
    listActivities();

    // assert
    expect(mocks.getAllAsync).toHaveBeenCalledOnce();
  });

  it("deletes an activity", () => {
    // arrange
    const idToDelete = "id-to-delete";
    const expectedSql = 'delete from activities where id == "id-to-delete"';

    // act
    deleteActivity(idToDelete);

    // assert
    expect(mocks.execAsync).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining(expectedSql),
    );
  });
});
