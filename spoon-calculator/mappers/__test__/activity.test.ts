import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";
import {
  ActivityView,
  mapActivityDtoToActivityView,
  mapActivityViewToActivityDto,
} from "../activity";
import { NewActivity } from "@/storage/database";

const mockActivityView: ActivityView = {
  activityName: "My Activity",
  cogLoadIndex: 0,
  physLoadIndex: 2,
  typeIndex: 3,
  qualifierIndex: 1,
  startTime: DateTime.utc(),
  endTime: DateTime.utc().plus({ hours: 1 }),
};

const mockActivityDto: NewActivity = {
  name: "Your Activity",
  cognitiveLoad: 1.5,
  physicalLoad: 0.5,
  type: "Rest",
  qualifier: "Phone",
  startDate: "2000-01-01T12:00:00.000Z",
  endDate: "2000-01-01T13:00:00.000Z",
};

describe("activity mapper", () => {
  it("maps activityView there and back", () => {
    // arrange
    const originalActivityView = { ...mockActivityView };

    // act
    const mappedActivityDto =
      mapActivityViewToActivityDto(originalActivityView);
    const resultActivityView = mapActivityDtoToActivityView(mappedActivityDto);

    // assert
    expect(resultActivityView).toEqual(originalActivityView);
  });

  it("maps activityDto there and back", () => {
    // arrange
    const originalActivityDto = { ...mockActivityDto };

    // act
    const mappedActivityView =
      mapActivityDtoToActivityView(originalActivityDto);
    const resultActivityDto = mapActivityViewToActivityDto(mappedActivityView);

    // assert
    expect(resultActivityDto).toEqual(originalActivityDto);
  });

  it("maps activityView with null for type index", () => {
    // arrange
    const originalActivityView: ActivityView = {
      ...mockActivityView,
      typeIndex: null,
    };

    // act
    const mappedActivityDto =
      mapActivityViewToActivityDto(originalActivityView);
    const resultActivityView = mapActivityDtoToActivityView(mappedActivityDto);

    // assert
    expect(resultActivityView).toEqual(originalActivityView);
  });

  it("maps activityView with null for qualifier index", () => {
    // arrange
    const originalActivityView: ActivityView = {
      ...mockActivityView,
      qualifierIndex: null,
    };

    // act
    const mappedActivityDto =
      mapActivityViewToActivityDto(originalActivityView);
    const resultActivityView = mapActivityDtoToActivityView(mappedActivityDto);

    // assert
    expect(resultActivityView).toEqual(originalActivityView);
  });
});
