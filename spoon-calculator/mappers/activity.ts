import { NewActivity, Activity } from "@/storage/database.native";
import { DateTime } from "luxon";

export const cognitiveLoadMap = [0, 0.5, 1, 1.5, 2];
export const physicalLoadMap = [0, 0.5, 1, 1.5, 2];

export const activityTypeMap = [
  "Necessary",
  "Rest",
  "Leisure",
  "Social",
  "Productive",
];

export const activityQualifierMap = [
  "Phone",
  "Screen",
  "Exercise",
  "Misc",
  "Boost",
];

export type ActivityView = {
  activityName: string;
  cogLoadIndex: number;
  physLoadIndex: number;
  typeIndex: number | null;
  qualifierIndex: number | null;
  startTime: DateTime<true>;
  endTime: DateTime<true>;
};

export const mapActivityViewToActivityDto = (
  av: ActivityView,
): NewActivity => ({
  name: av.activityName,
  cognitiveLoad: cognitiveLoadMap[av.cogLoadIndex],
  physicalLoad: physicalLoadMap[av.physLoadIndex],
  type: av.typeIndex === null ? "" : activityTypeMap[av.typeIndex],
  qualifier:
    av.qualifierIndex === null ? "" : activityQualifierMap[av.qualifierIndex],
  startDate: av.startTime.toISO(),
  endDate: av.endTime.toISO(),
});

export const mapActivityDtoToActivityView = (
  a: NewActivity | Activity,
): ActivityView => ({
  activityName: a.name,
  cogLoadIndex: getIndex(cognitiveLoadMap, a.cognitiveLoad),
  physLoadIndex: getIndex(physicalLoadMap, a.physicalLoad),
  typeIndex: getNullableIndex(activityTypeMap, a.type),
  qualifierIndex: getNullableIndex(activityQualifierMap, a.qualifier),
  startTime: safeDateTimeFromISO(a.startDate),
  endTime: safeDateTimeFromISO(a.endDate),
});

const getIndex = (map: number[], label: number): number => {
  return map.findIndex((el) => el === label);
};

const getNullableIndex = (map: string[], label: string): number | null => {
  const index = map.findIndex((el) => el === label);
  return index === -1 ? null : index;
};

const safeDateTimeFromISO = (dateTimeStr: string): DateTime<true> => {
  const dateTime = DateTime.fromISO(dateTimeStr).setZone("UTC");
  if (!dateTime.isValid) {
    throw Error("Invalid date time");
  }
  return dateTime;
};

export const formatActivityDto = (a: Activity) => {
  return `${a.name} | ${a.startDate} | ${a.endDate} | ${a.cognitiveLoad} | ${a.physicalLoad}`;
};
