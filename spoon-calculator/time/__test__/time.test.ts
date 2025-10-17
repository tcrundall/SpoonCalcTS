import { expect, describe, it } from "vitest";
import {
  decrement15Mins,
  decrement1Hour,
  getOffset as getOffsetInMinutes,
  increment15Mins,
  increment1Hour,
  roundToNearest15,
  stripTimezone,
} from "../time";
import { DateTime } from "luxon";

describe("simple test", () => {
  it("increments by 1:00", () => {
    // arrange
    const now = DateTime.now();

    // act
    const nowPlus1Hour = increment1Hour(now);
    const differenceInMinutes = nowPlus1Hour.diff(now).as("minutes");

    // assert
    expect(differenceInMinutes).toEqual(60);
  });

  it("decrements by 1:00", () => {
    // arrange
    const now = DateTime.now();

    // act
    const nowMinus1Hour = decrement1Hour(now);
    const differenceInMinutes = nowMinus1Hour.diff(now).as("minutes");

    // assert
    expect(differenceInMinutes).toEqual(-60);
  });
  it("increments by 0:15", () => {
    // arrange
    const now = DateTime.now();

    // act
    const nowPlus15Minutes = increment15Mins(now);
    const differenceInMinutes = nowPlus15Minutes.diff(now).as("minutes");

    // assert
    expect(differenceInMinutes).toEqual(15);
  });

  it("decrements by 0:15", () => {
    // arrange
    const now = DateTime.now();

    // act
    const nowMinus15Minutes = decrement15Mins(now);
    const differenceInMinutes = nowMinus15Minutes.diff(now).as("minutes");

    // assert
    expect(differenceInMinutes).toEqual(-15);
  });

  it("creates zone independent times", () => {
    // arrange
    const nowLocal = DateTime.now();
    const offset = getOffsetInMinutes(nowLocal);

    // act
    const nowWithoutTZ = stripTimezone(nowLocal);
    const durationInMinutes = nowWithoutTZ.diff(nowLocal).as("minutes");

    // assert
    expect(durationInMinutes).toEqual(offset);
  });

  it("rounds down to nearest 15 mins", () => {
    // arrange
    const timeToRound = DateTime.local(2000, 1, 1, 0, 7, 29);
    const expectedTime = DateTime.local(2000, 1, 1, 0, 0, 0);

    // act
    const roundedTime = roundToNearest15(timeToRound);

    // assert
    expect(roundedTime).toEqual(expectedTime);
  });

  it("rounds up to nearest 15 mins", () => {
    // arrange
    const timeToRound = DateTime.local(2000, 1, 1, 0, 7, 30);
    const expectedTime = DateTime.local(2000, 1, 1, 0, 15, 0);

    // act
    const roundedTime = roundToNearest15(timeToRound);

    // assert
    expect(roundedTime).toEqual(expectedTime);
  });
});
