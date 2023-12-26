import * as dt from "../datetime";

export const mapDbRowToActivity = (row) => {
  const parsedStartDate = Date.parse(row.start);
  const parsedEndDate = Date.parse(row.end);
  const activity = {
    ...row,
    ...{
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      startTime: dt.getTimeFromIsoString(row.start),
      endTime: dt.getTimeFromIsoString(row.end),
    }
  }
  activity.start = undefined;
  activity.end = undefined;
  return activity;
};
