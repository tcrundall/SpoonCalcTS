import { Button, Text, View } from "react-native";
import styles from "../styles";
import { ScrollView } from "react-native";
import Database from "../database";
import { useEffect, useState } from "react";

/*
- scroll view
- title
- list of activities
- delete button
*/

const db = Database.getConnection();

const getTimeFromIsoString = (datetimeString) => {
  const datetime = new Date(Date.parse(datetimeString));
  const hours = datetime.getHours();
  const minutes = datetime.getMinutes();
  return datetime.toLocaleString();
  // return `${hours}:${minutes}`;
  // return datetime.toTimeString().split(' ')[0].split(':').slice(0, 2).join(':');
};

const getDayStartFromOffset = (offset) => {
  const today = getTodayMidnight();
  const result = new Date(today);
  return addDays(result, offset);
};

const getTodayMidnight = () => {
  today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  return today;
};


const addDays = (date, days) => {
  console.log(`Received date: ${date}`);
  result = new Date(date);
  console.log(`Reconstructed date as: ${result.toString()}`);
  result.setDate(result.getDate() + days);
  return result
}

const printTime = (t, label = "") => {
  console.log(`${label} ${t.toString()}`);
};

const LogsScreen = ({ navigation }) => {
  const [items, setItems] = useState([1, 2, 3]);
  const [dayOffset, setDayOffset] = useState(-1);

  useEffect(
    () => {
      db.transaction((tx) => {
        const currentDay = getDayStartFromOffset(dayOffset);
        const yesterday = addDays(currentDay, -1);
        const tomorrow = addDays(currentDay, 1);
        console.log();
        printTime(yesterday, "yesterday ");
        printTime(currentDay, "today     ");
        printTime(tomorrow, "tomorrow  ");
        console.log();
        console.log(`today:    ${currentDay.toISOString()}`);
        console.log(`tomorrow: ${tomorrow.toISOString()}`);
        tx.executeSql(`select * from activities where start between '${currentDay.toISOString()}' and '${tomorrow.toISOString()}';`, [], (_, { rows }) => {
          // tx.executeSql(`select * from activities where id > 1;`, [], (_, { rows }) => {
          // tx.executeSql(`select * from activities;`, [], (_, { rows }) => {
          console.log(JSON.stringify(rows));
          setItems(rows._array);
        });
      });
    },
    [dayOffset],
    null,
  );

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Button
          title="<"
          onPress={() => {
            setDayOffset(dayOffset - 1);
          }}
        />
        <Text style={styles.h1}>Logs</Text>
        <Button
          title=">"
          onPress={() => {
            setDayOffset(dayOffset + 1);
          }}
        />
      </View>
      <ScrollView style={{ flex: 1, borderTopWidth: 2, borderTopColor: "white" }}>
        <View style={{
          ...{
            justifyContent: "flex",
            flexDirection: "row",
            borderBottomWidth: 2,
            borderBottomColor: "white",
          },
          ...styles.debug
        }}>
          <Text style={{ ...styles.h4, ...{ flex: 2 } }}>Time</Text>
          <Text style={{ ...styles.h4, ...{ flex: 1 } }}>Id</Text>
          <Text style={{ ...styles.h4, ...{ flex: 5 } }}>Name</Text>
          <Text style={{ ...styles.h4, ...{ flex: 1 } }}>Cog.</Text>
          <Text style={{ ...styles.h4, ...{ flex: 1 } }}>Phys.</Text>
          <Text style={{ ...styles.h4, ...{ flex: 1 } }}>Edit</Text>
          <Text style={{ ...styles.h4, ...{ flex: 1 } }}>Del.</Text>
        </View>
        {items.map((a) => (
          <View key={a.id} style={{
            ...{
              justifyContent: "flex",
              flexDirection: "row",
              borderBottomWidth: 2,
              borderBottomColor: "white",
            },
            ...styles.debug
          }}>
            <View style={{ ...{ flex: 10, }, ...styles.debug }}>
              <Text style={styles.debug}>{getTimeFromIsoString(a.start)}</Text>
              <Text style={styles.debug}> - {getTimeFromIsoString(a.end)}</Text>
            </View>
            <Text style={{ ...styles.h2, ...{ flex: 1 } }}>{a.id}</Text>
            <Text style={{ ...styles.h2, ...{ flex: 5 } }}>{a.name}</Text>
            <Text style={{ ...styles.h2, ...{ flex: 1 } }}>{a.cognitiveLoad}</Text>
            <Text style={{ ...styles.h2, ...{ flex: 1 } }}>{a.physicalLoad}</Text>
            <View style={{ flex: 1 }}>
              <Button
                title="E"
                onPress={() => {
                  console.log(`Editing ${a.name}!`);
                }}
                style={{ flex: 1 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="X"
                onPress={() => {
                  console.log(`Deleting ${a.name}!`);
                }}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        ))
        }
      </ScrollView >
      <Button
        onPress={() => {
          console.log("Logs");
          navigation.navigate("Home");
        }}
        title="Logs"
      />
    </View >
  );
};

export default LogsScreen;
