import * as SQLite from "expo-sqlite";

type SimpleEntry = {
  id: string;
  name: string;
}

export const logToConsole = (msg: string) => {
  console.log(msg);
};

const databaseName = "spooncalc-rn.db";

export const initialiseDatabase = async () => {
  const db = await SQLite.openDatabaseAsync(databaseName);
  await db.execAsync(
    "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
  );
}

export const myOpenDatabase = async () => {
  const db = await SQLite.openDatabaseAsync(databaseName);
  console.log("Storage::successfully opened a database!")
  await db.closeAsync();
}

export const addRow = async () => {
  console.log("Storage::adding a row!")
  const db = await SQLite.openDatabaseAsync(databaseName);
  await db.execAsync("INSERT INTO items ( name ) VALUES ( 'text' );")
  await db.closeAsync();
}

export const listTable = async () => {
  console.log("Storage::listing table!")
  const db = await SQLite.openDatabaseAsync(databaseName);

  const allRows: SimpleEntry[] = await db.getAllAsync("SELECT * from items");
  console.log("Entering for loop");
  for (const row of allRows) {
    console.log(row.id, row.name);
  }
  await db.closeAsync();
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

// type Symptom = {
//   pain: string;
//   nausea: string;
//   fatigue: string;
//   fluLike: string;
//   sleepy: string;
// }

export const createActivitiesTable = async () => {
  const db = await SQLite.openDatabaseAsync(databaseName);
  db.withTransactionAsync(async () => {
    // db.execAsync('drop table activities;');
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
          start datetime,
          end datetime
        );
        `
    );

    const allRows: Activity[] = await db.getAllAsync("SELECT * from activities");

    for (const row of allRows) {
      console.log(row.id, row.name, row.cognitiveLoad);
    }
  });
  await db.closeAsync();
};

export const saveActivity = async (a: Activity) => {
  console.log("In saveActivity");
  const db = await SQLite.openDatabaseAsync(databaseName);
  db.withTransactionAsync(async () => {
    db.execAsync(
      `
      insert into activities
        (name, cognitiveLoad, physicalLoad, type, qualifier, start, end)
      values
        ("${a.name}", "${a.cognitiveLoad}", "${a.physicalLoad}", "${a.type}", "${a.qualifier}", "${a.startDate}", "${a.endDate}")
      `);
  });
  console.log("Added to activites...");
  await db.closeAsync();
};

export const listActivities = async () => {
  console.log("Storage::listing activities!")
  const db = await SQLite.openDatabaseAsync(databaseName);

  const allRows: Activity[] = await db.getAllAsync("SELECT * from activities");
  console.log("Entering for loop");
  for (const row of allRows) {
    console.log(row.id, row.name, row.cognitiveLoad);
  }
  await db.closeAsync();
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
