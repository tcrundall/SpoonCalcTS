import * as dt from "../datetime";

export const mapDbRowToActivity = (row) => {
  const parsedStartDate = dt.getTimeFromIsoString(row.start);
  const parsedEndDate = dt.getTimeFromIsoString(row.end);
  const activity = {
    ...row,
    ...{
      startDate: parsedStartDate,
      endDate: parsedEndDate,
    }
  }
  activity.start = undefined;
  activity.end = undefined;
  return activity;
};
