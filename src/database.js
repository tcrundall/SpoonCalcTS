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

export const saveActivity = (a) => {
  console.log("In saveActivity");
  db.transaction((tx) => {
    tx.executeSql(
      `
      insert into activities
        (name, cognitiveLoad, physicalLoad, type, qualifier, start, end)
      values 
        ("${a.name}", "${a.cognitiveLoad}", "${a.physicalLoad}", "${a.type}", "${a.qualifier}", "${a.startDate}", "${a.endDate}")
      `,
      []);
    tx.executeSql("select * from activities;", [], (_, { rows }) =>
      console.log(`Added to activities: ${JSON.stringify(rows)}`)
    );
  });
  console.log("Added to activites...?");
};

export const updateActivity = (a) => {
  console.log("In updateActivity");
  db.transaction((tx) => {
    tx.executeSql(`select * from activities where id = ${a.id};`, [], (_, { rows }) =>
      console.log(`Updating activity: ${JSON.stringify(rows)}`)
    );
    tx.executeSql(
      `
      update activities
      set
        name = "${a.name}",
        cognitiveLoad = "${a.cognitiveLoad}",
        physicalLoad = "${a.physicalLoad}",
        type = "${a.type}",
        qualifier = "${a.qualifier}",
        start = "${a.startDate}",
        end = "${a.endDate}"
      where
        id = ${a.id}
      `,
      []);
    tx.executeSql(`select * from activities where id = ${a.id};`, [], (_, { rows }) =>
      console.log(`Updated activity: ${JSON.stringify(rows)}`)
    );
  });
  console.log("Updated activity...?");
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
