import * as SQLite from 'expo-sqlite';

const databaseName = "spooncalc-rn.db";
const db = SQLite.openDatabase(databaseName);

class Database {
  getConnection() {
    return db
  }
}

export default new Database();
