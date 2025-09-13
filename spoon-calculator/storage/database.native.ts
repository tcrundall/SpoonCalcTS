import dayjs from "dayjs";
import * as SQLite from "expo-sqlite";

type SimpleEntry = {
  id: string;
  name: string;
}

export const logToConsole = (msg: string) => {
  console.log(msg);
};

const databaseName = "spooncalc-rn.db";
const db = SQLite.openDatabaseSync(databaseName);

export const initialiseDatabase = async () => {
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
  );
}

export const myOpenDatabase = async () => {
  console.log("Storage::successfully opened a database!")
}

export const addRow = async () => {
  console.log("Storage::adding a row!")
  await db.execAsync("INSERT INTO items ( name ) VALUES ( 'text' );")
}

export const listTable = async () => {
  console.log("Storage::listing table!")
  const allRows: SimpleEntry[] = await db.getAllAsync("SELECT * from items");
  console.log("Entering for loop");
  for (const row of allRows) {
    console.log(row.id, row.name);
  }
}

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

export const createActivitiesTable = async () => {
  db.withTransactionAsync(async () => {
    db.execAsync(
      `
        create table if not exists activities
        (
          id integer primary key not null,
          name string,
          cognitiveLoad int,
          physicalLoad int,
          type int,
          qualifier int,
          startDate datetime,
          endDate datetime
        );
        `
    );

    const allRows: Activity[] = await db.getAllAsync("SELECT * from activities");

    for (const row of allRows) {
      console.log(row.id, row.name, row.cognitiveLoad);
    }
  });
};

export const saveActivity = async (a: Activity) => {
  console.log("In saveActivity");
  db.withTransactionAsync(async () => {
    db.execAsync(
      `
      insert into activities
        (name, cognitiveLoad, physicalLoad, type, qualifier, startDate, endDate)
      values
        (
          "${a.name}",
          "${a.cognitiveLoad}",
          "${a.physicalLoad}",
          "${a.type}",
          "${a.qualifier}",
          "${a.startDate}",
          "${a.endDate}"
        )
      `);
  });
  console.log("Added to activites...");
};

export const listActivities = async () => {
  console.log("Storage::listing activities!")

  const allRows: Activity[] = await db.getAllAsync("SELECT * from activities");
  console.log("Entering for loop");
  for (const row of allRows) {
    console.log(row.id, row.name, row.cognitiveLoad, row.physicalLoad, row.type, row.qualifier, dayjs(row.startDate).format("HH:MM:SS"), row.endDate);
  }
}

// export const updateActivity = (a: Activity) => {
//   console.log("In updateActivity");
//   db.withTransactionAsync(async () => {
//     // db.execAsync(`select * from activities where id = ${a.id};`, [], (_, { rows }) =>
//     //   console.log(`Updating activity: ${JSON.stringify(rows)}`)
//     // );
//     db.execAsync(
//       `
//       update activities
//       set
//         name = "${a.name}",
//         cognitiveLoad = "${a.cognitiveLoad}",
//         physicalLoad = "${a.physicalLoad}",
//         type = "${a.type}",
//         qualifier = "${a.qualifier}",
//         start = "${a.startDate}",
//         end = "${a.endDate}"
//       where
//         id = ${a.id}
//       `
//     );
//     // db.execAsync(`select * from activities where id = ${a.id};`, [], (_, { rows }) =>
//     //   console.log(`Updated activity: ${JSON.stringify(rows)}`)
//     // );
//   });
//   console.log("Updated activity...?");
// };
//
// type Symptom = {
//   pain: string;
//   nausea: string;
//   fatigue: string;
//   fluLike: string;
//   sleepy: string;
// }
//
// export function createSymptomsTable() {
//   db.withTransactionAsync(async () => {
//     // db.execAsync("drop table symptoms");
//     db.execAsync(`
//         create table if not exists symptoms
//         (
//           id integer primary key not null,
//           pain int,
//           nausea int,
//           fatigue int,
//           fluLike int,
//           sleepy int,
//           datetime datetime
//         );
//         `);
//     // db.execAsync("select * from symptoms;", [], (_, { rows }) =>
//     //   console.log(JSON.stringify(rows)));
//   });
// }
//
// export const saveSymptoms = (s: Symptom) => {
//   console.log("Saving symptoms...");
//   db.withTransactionAsync(async () => {
//     // db.execAsync("select * from symptoms;", [], (_, { rows }) => { console.log(JSON.stringify(rows)) })
//     db.execAsync(
//       `
//       insert into symptoms
//       (
//         pain,
//         nausea,
//         fatigue,
//         fluLike,
//         sleepy,
//         datetime
//       ) values (
//         "${s.pain}",
//         "${s.nausea}",
//         "${s.fatigue}",
//         "${s.fluLike}",
//         "${s.sleepy}",
//         "${new Date()}"
//       )
//       `
//     );
//     // db.execAsync("select * from symptoms;", [], (_, { rows }) => { console.log(JSON.stringify(rows)) })
//   }
//   );
// };
//
// export default new Database();
//
