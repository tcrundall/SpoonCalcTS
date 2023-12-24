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
  return datetime.toTimeString().split(' ')[0].split(':').slice(0, 2).join(':');
};

const LogsScreen = ({ navigation }) => {
  const [items, setItems] = useState([1, 2, 3]);

  useEffect(
    () => {
      db.transaction((tx) => {
        tx.executeSql("select * from activities;", [], (_, { rows }) => {
          console.log(JSON.stringify(rows));
          setItems(rows._array);
        });
      });
    },
    [],
    null,
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.h1}>Logs</Text>
      <ScrollView style={{ flex: 1 }}>
        {items.map((a) => (
          <View key={a.id} style={{ ...{ justifyContent: "flex", flexDirection: "row" }, ...styles.debug }}>
            <View style={{ ...{ flex: 2 }, ...styles.debug }}>
              <Text style={styles.debug}>{getTimeFromIsoString(a.start)}</Text>
              <Text style={styles.debug}> - {getTimeFromIsoString(a.end)}</Text>
            </View>
            <Text style={{ ...styles.h2, ...{ flex: 5 } }}>{a.name}</Text>
            <Text style={{ ...styles.h2, ...{ flex: 1 } }}>{a.cognitiveLoad}</Text>
            <Text style={{ ...styles.h2, ...{ flex: 1 } }}>{a.physicalLoad}</Text>
            <Button
              title="E"
              onPress={() => {
                console.log(`Editing ${a.name}!`);
              }}
              style={{ flex: 1 }}
            />
            <Button
              title="X"
              onPress={() => {
                console.log(`Deleting ${a.name}!`);
              }}
              style={{ flex: 1 }}
            />
          </View>
        ))
        }
      </ScrollView >
      <Button
        onPress={() => {
          console.log("Logs");
        }}
        title="Logs"
      />
    </View >
  );
};

export default LogsScreen;
