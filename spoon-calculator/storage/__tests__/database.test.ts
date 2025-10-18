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
    executeAsync: vi.fn(),
    withTransactionAsync: (func: any) => {
      return func();
    },
    getAllAsync: vi.fn((): Activity[] => []),
  };
});

vi.mock("expo-sqlite", () => ({
  openDatabaseSync: () => {
    return {
      prepareAsync: () => ({
        executeAsync: mocks.executeAsync,
      }),
      executeAsync: mocks.executeAsync,
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
    // TODO: figure out way to also test the "prepareAsync" call
    // arrange
    const myActivity = getActivity();

    // act
    await saveActivity(myActivity);

    // assert
    expect(mocks.executeAsync).toHaveBeenCalledExactlyOnceWith({
      $name: myActivity.name,
      $cognitiveLoad: myActivity.cognitiveLoad,
      $physicalLoad: myActivity.physicalLoad,
      $type: myActivity.type,
      $qualifier: myActivity.qualifier,
      $startDate: myActivity.startDate,
      $endDate: myActivity.endDate,
    });
  });

  it("updates an activity", async () => {
    // arrange
    const updatedActivity = {
      ...getActivity(),
      name: "New name",
      id: "some-id",
    };

    // act
    await updateActivity(updatedActivity);

    // assert
    expect(mocks.executeAsync).toHaveBeenCalledExactlyOnceWith({
      $name: updatedActivity.name,
      $cognitiveLoad: updatedActivity.cognitiveLoad,
      $physicalLoad: updatedActivity.physicalLoad,
      $type: updatedActivity.type,
      $qualifier: updatedActivity.qualifier,
      $startDate: updatedActivity.startDate,
      $endDate: updatedActivity.endDate,
      $id: updatedActivity.id,
    });
  });

  it("deletes an activity", async () => {
    // arrange
    const idToDelete = "id-to-delete";

    // act
    await deleteActivity(idToDelete);

    // assert
    expect(mocks.executeAsync).toHaveBeenCalledExactlyOnceWith({
      $id: idToDelete,
    });
  });
});
