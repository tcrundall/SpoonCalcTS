import { DateTime } from "luxon";

export const getOffset = (time: DateTime<true>) => {
  return time.zone.offset(time.toMillis());
};

/*
 * Replace timezone with UTC without changing actual value of time.
 *
 * Useful for storing data in a timezone independent way
 */
export const stripTimezone = (time: DateTime) => {
  var timeWithoutZone = time.toISO()?.split("+")[0];
  if (timeWithoutZone == undefined) {
    throw Error;
  }
  var timeOverrideZone = DateTime.fromISO(timeWithoutZone, { zone: "UTC" });
  return timeOverrideZone;
};

export const getNowWithoutTZ = () => {
  return stripTimezone(DateTime.now());
};

export const increment15Mins = (time: DateTime) => {
  return time.plus({ minutes: 15 });
};

export const decrement15Mins = (time: DateTime) => {
  return time.minus({ minutes: 15 });
};

export const increment1Hour = (time: DateTime) => {
  return time.plus({ hours: 1 });
};

export const decrement1Hour = (time: DateTime) => {
  return time.minus({ hours: 1 });
};

/*
 * Round to nearest 15 minutes, by incrementing by 7.5 mins
 * and rounding down to next earlier 15 minute mark
 */
export const roundToNearest15 = (time: DateTime): DateTime<true> => {
  if (time.zoneName !== "UTC") {
    throw Error("Expected to receive UTC time only");
  }

  const timeInMillis = time.toMillis();
  const offsettedTime = timeInMillis + 7.5 * 60 * 1000;
  const overflow = offsettedTime % (15 * 60 * 1000);
  const roundedTimeInMillis = offsettedTime - overflow;
  const withTZ = DateTime.fromMillis(roundedTimeInMillis).setZone("UTC");
  const withoutTZ = stripTimezone(withTZ);

  if (!withoutTZ.isValid) {
    throw Error("Something went wrong when rounding time");
  }
  return withoutTZ;
};

export const nowWith15MinResolution = () => {
  return roundToNearest15(getNowWithoutTZ());
};

export const formatDate = (time: DateTime) => {
  if (
    time.toFormat("YYYY-MM-dd") !== getNowWithoutTZ().toFormat("YYYY-MM-dd")
  ) {
    return time.toFormat("dd-MM-yyyy");
  }
  return "";
};
export const formatTime = (time: DateTime) => {
  return time.toFormat("HH:mm");
};
