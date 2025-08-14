import * as SQLite from 'expo-sqlite';

// const databaseName = "spooncalc-rn.db";
// const db = await SQLite.openDatabaseAsync(databaseName);

type Activity = {
  id: string;
  name: string;
  cognitiveLoad: number;
  physicalLoad: number;
  type: string;
  qualifier: string;
  startDate: string;
  endDate: string;
};

type Symptom = {
  pain: string;
  nausea: string;
  fatigue: string;
  fluLike: string;
  sleepy: string;
}

export const logToConsole = (msg: string) => {
  console.log(msg);
};

// class Database {
//   getConnection() {
//     return db
//   }
// }
//
// export const createActivitiesTable = () => {
//   db.withTransactionAsync(async () => {
//     // db.execAsync('drop table activities;');
//     db.execAsync(
//       `
//         create table if not exists activities
//         (
//           id integer primary key not null,
//           name string,
//           cognitiveLoad int,
//           physicalLoad int,
//           type int,
//           qualifier int,
//           start datetime,
//           end datetime
//         );
//         `
//     );
//
//     db.execAsync(
//       `
//         create table if not exists example
//         (
//           id integer primary key not null,
//           name string,
//         );
//         `
//     );
//     // db.execAsync("select * from activities;", [], (_, { rows }) =>
//     //   console.log(`Current activities: ${JSON.stringify(rows)} `)
//     // );
//   });
// };
//
// export const saveExample = (word: string) => {
//   console.log("In saveExample");
//   db.withTransactionAsync(async () => {
//     db.execAsync(
//       `
//       insert into example
//         (name)
//       values
//         (${word})
//       `);
//     // db.execAsync("select * from activities;", [], (_, { rows }) =>
//     //   console.log(`Added to activities: ${JSON.stringify(rows)}`)
//     // );
//   });
//   console.log("Added to activites...?");
// };
//
// export const saveActivity = (a: Activity) => {
//   console.log("In saveActivity");
//   db.withTransactionAsync(async () => {
//     db.execAsync(
//       `
//       insert into activities
//         (name, cognitiveLoad, physicalLoad, type, qualifier, start, end)
//       values
//         ("${a.name}", "${a.cognitiveLoad}", "${a.physicalLoad}", "${a.type}", "${a.qualifier}", "${a.startDate}", "${a.endDate}")
//       `);
//     // db.execAsync("select * from activities;", [], (_, { rows }) =>
//     //   console.log(`Added to activities: ${JSON.stringify(rows)}`)
//     // );
//   });
//   console.log("Added to activites...?");
// };
//
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
