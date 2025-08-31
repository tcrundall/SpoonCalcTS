import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Suspense fallback={<DatabaseLoadingFallback />}>
        <SQLiteProvider
          databaseName="test.db"
          onInit={migrateDbIfNeeded}
          useSuspense
        >
          <Header />
          <Content />
        </SQLiteProvider>
      </Suspense>
    </View>
  );
}

function DatabaseLoadingFallback() {
  return (
    <View style={{ backgroundColor: "pink", padding: 20 }}>
      <Text>Waiting on database initialization...</Text>
    </View>
  );
}

export function Header() {
  const db = useSQLiteContext();
  const [version, setVersion] = useState("");
  useEffect(() => {
    async function setup() {
      const result = await db.getFirstAsync<{ "sqlite_version()": string }>(
        "SELECT sqlite_version()",
      );
      setVersion(result?.["sqlite_version()"] || "");
    }
    setup();
  }, []);
  return (
    <View>
      <Text>SQLite version: {version}</Text>
    </View>
  );
}

interface Todo {
  value: string;
  intValue: number;
}

export function Content() {
  const db = useSQLiteContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<Todo>("SELECT * FROM todos");
      setTodos(result);
    }
    setup();
  }, []);

  return (
    <View>
      {todos.map((todo, index) => (
        <View key={index}>
          <Text>{`${todo.intValue} - ${todo.value}`}</Text>
        </View>
      ))}
    </View>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let res = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
  if (!res) return;
  let { user_version: currentDbVersion } = res;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
`);
    await db.runAsync(
      "INSERT INTO todos (value, intValue) VALUES (?, ?)",
      "hello",
      1,
    );
    await db.runAsync(
      "INSERT INTO todos (value, intValue) VALUES (?, ?)",
      "world",
      2,
    );
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
