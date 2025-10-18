import { DateTime } from "luxon";
import * as SQLite from "expo-sqlite";

const databaseName = "spooncalc-rn.db";
const db = SQLite.openDatabaseSync(databaseName);

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
        `,
    );
  });
};

export const saveActivity = async (a: NewActivity) => {
  db.withTransactionAsync(async () => {
    const statement = await db.prepareAsync(
      `
      insert into activities
        (name, cognitiveLoad, physicalLoad, type, qualifier, startDate, endDate)
      values
        ($name, $cognitiveLoad, $physicalLoad, $type, $qualifier, $startDate, $endDate)
      `,
    );
    await statement.executeAsync({
      $name: a.name,
      $cognitiveLoad: a.cognitiveLoad,
      $physicalLoad: a.physicalLoad,
      $type: a.type,
      $qualifier: a.qualifier,
      $startDate: a.startDate,
      $endDate: a.endDate,
    });
  });
};

export const updateActivity = async (a: Activity) => {
  db.withTransactionAsync(async () => {
    const statement = await db.prepareAsync(
      `
      update activities
      set
        name = $name,
        cognitiveLoad = $cognitiveLoad,
        physicalLoad = $physicalLoad,
        type = $type,
        qualifier = $qualifier,
        startDate = $startDate,
        endDate = $endDate
      where
        id = $id
      `,
    );
    await statement.executeAsync({
      $name: a.name,
      $cognitiveLoad: a.cognitiveLoad,
      $physicalLoad: a.physicalLoad,
      $type: a.type,
      $qualifier: a.qualifier,
      $startDate: a.startDate,
      $endDate: a.endDate,
      $id: a.id,
    });
  });
  console.log("Updated activity...?");
};

export const getActivitiesOnDay = (dateTime: DateTime<true>): Activity[] => {
  // TODO: Add tests, particularly around midnight
  console.log("Storage::getting activities!");
  const dayStart = dateTime.startOf("day").toISO();
  const dayEnd = dateTime.endOf("day").toISO();
  const allRows: Activity[] = db.getAllSync(
    `SELECT * from activities where startDate between "${dayStart}" and "${dayEnd}"`,
  );
  for (const row of allRows) {
    console.log(
      row.id,
      row.name,
      row.cognitiveLoad,
      row.physicalLoad,
      row.type,
      row.qualifier,
      row.startDate,
      row.endDate,
    );
  }
  return allRows;
};

export const getAllAcitivites = (): Activity[] => {
  const allRows: Activity[] = db.getAllSync("SELECT * from activities");
  for (const row of allRows) {
    console.log(
      row.id,
      row.name,
      row.cognitiveLoad,
      row.physicalLoad,
      row.type,
      row.qualifier,
      row.startDate,
      row.endDate,
    );
  }
  return allRows;
};

export const deleteActivity = async (id: string) => {
  console.log(`Deleteing activity with id ${id}`);
  const statement = await db.prepareAsync(
    "delete from activities where id == $id",
  );
  statement.executeAsync({ $id: id });
};

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
