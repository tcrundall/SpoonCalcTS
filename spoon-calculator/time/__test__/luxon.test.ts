import { expect, it } from "vitest";
import { DateTime } from "luxon";

it("works with intervals", () => {
  // arrange
  const intervalInDays = 7;
  const now = DateTime.now();
  const then = now.minus({ days: intervalInDays });

  // act
  const duration = now.diff(then);

  // assert
  expect(duration.as("days")).toEqual(intervalInDays);
});

it("handles timezone", () => {
  // arrange
  const nowLocal = DateTime.now();
  const nowUTC = nowLocal.toUTC();
  const offset = nowLocal.zone.offset(nowLocal.toMillis());

  // act
  // stripping local now of it's time zone (and pretending it's UTC) gives a time difference equal
  // to offset
  const nowLocalWithoutZone = nowLocal.toISOTime().split("+")[0];
  const nowOverrideZone = DateTime.fromISO(nowLocalWithoutZone, {
    zone: "UTC",
  });
  const duration = nowOverrideZone.diff(nowUTC);

  // assert
  expect(duration.as("minutes")).toEqual(offset);
});
