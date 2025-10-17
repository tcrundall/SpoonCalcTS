import { expect, describe, it } from "vitest";
import {
  decrement15Mins,
  decrement1Hour,
  getNowWithoutTZ,
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

  it("creates now without timezone", () => {
    // arrange
    const nowWithoutTZ = getNowWithoutTZ();
    const nowLocal = DateTime.now();

    // act + assert
    expect(nowWithoutTZ.zoneName).toEqual("UTC");
    // TODO: use an object comparison
    expect(nowWithoutTZ.month).toEqual(nowLocal.month);
    expect(nowWithoutTZ.day).toEqual(nowLocal.day);
    expect(nowWithoutTZ.hour).toEqual(nowLocal.hour);
    expect(nowWithoutTZ.minute).toEqual(nowLocal.minute);
  });

  it("creates zone independent times", () => {
    // arrange
    const timeToStrip = DateTime.local(2000, 1, 1, 12, 0, 0, {
      zone: "Europe/Berlin",
    });
    const expectedTime = DateTime.local(2000, 1, 1, 12, 0, 0, { zone: "UTC" });

    // act
    const timeWithoutTZ = stripTimezone(timeToStrip);

    // assert
    expect(timeWithoutTZ).toEqual(expectedTime);
  });

  it("rounds down to nearest 15 mins", () => {
    // arrange
    const timeToRound = stripTimezone(DateTime.local(2000, 1, 1, 0, 7, 29));
    const expectedTime = stripTimezone(DateTime.local(2000, 1, 1, 0, 0, 0));

    // act
    const roundedTime = roundToNearest15(timeToRound);

    // assert
    expect(roundedTime).toEqual(expectedTime);
  });

  it("rounds up to nearest 15 mins", () => {
    // arrange
    const timeToRound = stripTimezone(DateTime.local(2000, 1, 1, 0, 7, 30));
    const expectedTime = stripTimezone(DateTime.local(2000, 1, 1, 0, 15, 0));

    // act
    const roundedTime = roundToNearest15(timeToRound);

    // assert
    expect(roundedTime).toEqual(expectedTime);
  });

  it("rounding throws error on non-UTC time", () => {
    // arrange
    const nonUtcTime = DateTime.now().setZone("Europe/Berlin");

    // act + assert
    expect(() => {
      roundToNearest15(nonUtcTime);
    }).toThrowError("Expected to receive UTC time only");
  });
});
