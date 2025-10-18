import { getNowWithoutTZ, nowWith15MinResolution } from "@/time/time";
import { DateTime } from "luxon";

export type Activity = {
  id: string;
  name: string;
  cognitiveLoad: number;
  physicalLoad: number;
  type: string;
  qualifier: string;
  startDate: string;
  endDate: string;
};

export type NewActivity = Omit<Activity, "id">;

const now = nowWith15MinResolution();

var mockActivityDtos: Activity[] = [
  {
    id: "1",
    name: "My Activity",
    cognitiveLoad: 0.5,
    physicalLoad: 1,
    type: "Leisure",
    qualifier: "Screen",
    startDate: now.toISO(),
    endDate: now.plus({ hours: 1 }).toISO(),
  },
  {
    id: "2",
    name: "Your Activity",
    cognitiveLoad: 1.5,
    physicalLoad: 0.5,
    type: "Rest",
    qualifier: "Phone",
    startDate: now.minus({ hours: 2 }).toISO(),
    endDate: now.minus({ hours: 1, minutes: 15 }).toISO(),
  },
  {
    id: "3",
    name: "My Activity",
    cognitiveLoad: 0.5,
    physicalLoad: 1,
    type: "Leisure",
    qualifier: "Screen",
    startDate: now.plus({ days: 1 }).toISO(),
    endDate: now.plus({ days: 1, hours: 1 }).toISO(),
  },
  {
    id: "4",
    name: "Your Activity",
    cognitiveLoad: 1.5,
    physicalLoad: 0.5,
    type: "Rest",
    qualifier: "Phone",
    startDate: now.minus({ days: 1, hours: 2 }).toISO(),
    endDate: now.minus({ days: 1, hours: 1 }).toISO(),
  },
];

export const logToConsole = (msg: string) => {
  console.log(msg);
};

export const initialiseDatabase = async () => {
  console.log("(NOT) initialising database");
};

export const myOpenDatabase = async () => {
  console.log("(NOT) Storage::successfully opened a database!");
};

export const addRow = async () => {
  console.log("(NOT) Storage::adding a row!");
};

export const getActivitiesOnDay = (dateTime: DateTime<true>): Activity[] => {
  console.log("(NOT) Storage::getting table!");
  const day = dateTime.toISODate();
  return mockActivityDtos.filter((a) => RegExp(`${day}`).test(a.startDate));
};

export const listTable = async () => {
  console.log("(NOT) Storage::listing table!");
};

export const createActivitiesTable = async () => {
  console.log("(NOT) Storage::creating activities table!");
};

export const saveActivity = async (a: NewActivity) => {
  console.log("(NOT) In saveActivity");
  console.log("(NOT) Added to activites...", a);
};

export const listActivities = async () => {
  console.log("(NOT) Storage::listing activities!");
  console.log("(NOT) Entering for loop");
};

export const deleteActivity = (id: string) => {
  console.log(`(NOT) Deleteing activity with id ${id}`);
  mockActivityDtos = mockActivityDtos.filter((a) => a.id !== id);
  console.log(mockActivityDtos);
};
