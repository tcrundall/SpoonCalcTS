import * as SQLite from 'expo-sqlite';

const databaseName = "spooncalc-rn.db";
const db = SQLite.openDatabase(databaseName);

class Database {
  getConnection() {
    return db
  }
}

export const createActivitiesTable = () => {
  db.transaction((tx) => {
    // tx.executeSql('drop table activities;');
    tx.executeSql(
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
    tx.executeSql("select * from activities;", [], (_, { rows }) =>
      console.log(`Current activities: ${JSON.stringify(rows)} `)
    );
  });
};

export function createSymptomsTable() {
  db.transaction((tx) => {
    // tx.executeSql("drop table symptoms");
    tx.executeSql(`
        create table if not exists symptoms
        (
          id integer primary key not null,
          pain int,
          nausea int,
          fatigue int,
          fluLike int,
          sleepy int,
          datetime datetime
        );
        `);
    tx.executeSql("select * from symptoms;", [], (_, { rows }) =>
      console.log(JSON.stringify(rows)));
  });
}

export const saveSymptoms = (s) => {
  console.log("Saving symptoms...");
  db.transaction((tx) => {
    tx.executeSql("select * from symptoms;", [], (_, { rows }) => { console.log(JSON.stringify(rows)) })
    tx.executeSql(
      `
      insert into symptoms
      (
        pain,
        nausea,
        fatigue,
        fluLike,
        sleepy,
        datetime
      ) values (
        "${s.pain}",
        "${s.nausea}",
        "${s.fatigue}",
        "${s.fluLike}",
        "${s.sleepy}",
        "${new Date()}"
      )
      `
    );
    tx.executeSql("select * from symptoms;", [], (_, { rows }) => { console.log(JSON.stringify(rows)) })
  }
  );
};

export default new Database();
