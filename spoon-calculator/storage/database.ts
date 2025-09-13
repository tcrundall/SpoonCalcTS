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

export const logToConsole = (msg: string) => {
  console.log(msg);
};

export const initialiseDatabase = async () => {
  console.log("(NOT) initialising database");
}

export const myOpenDatabase = async () => {
  console.log("(NOT) Storage::successfully opened a database!")
}

export const addRow = async () => {
  console.log("(NOT) Storage::adding a row!")
}

export const listTable = async () => {
  console.log("(NOT) Storage::listing table!")
}

export const createActivitiesTable = async () => {
  console.log("(NOT) Storage::creating activities table!")
};

export const saveActivity = async (a: Activity) => {
  console.log("(NOT) In saveActivity");
  console.log("(NOT) Added to activites...", a);
};

export const listActivities = async () => {
  console.log("(NOT) Storage::listing activities!")
  console.log("(NOT) Entering for loop");
}
