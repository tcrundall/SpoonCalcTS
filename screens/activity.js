import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { View, Text, Button, TextInput } from "react-native";
import MyButtonGroup from "../components/buttongroup";
import FooterButton from "../components/buttonfooter";
import styles from "../styles";
import Database from "../database";

const getRoundedDate = (d = new Date()) => {
  const roundInMs = 1000 * 60 * 15;  // 15 minutes in milliseconds
  const roundedDate = new Date(Math.round(d.getTime() / roundInMs) * roundInMs);
  return roundedDate;
};

const db = Database.getConnection();

const saveActivity = (name) => {
  db.transaction((tx) => {
    tx.executeSql(`insert into activities (activity) values ("${name}");`, []);
    tx.executeSql("select * from activities;", [], (_, { rows }) =>
      console.log(`Added to activities: ${JSON.stringify(rows)}`)
    );
  });
  console.log("Created table");
};

const ActivityScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists activities (id integer primary key not null, activity string);"
      );
      tx.executeSql("select * from activities;", [], (_, { rows }) =>
        console.log(`Current activities: ${JSON.stringify(rows)}`)
      );
    });
    console.log("Created table");
  }, []);

  const [cognitiveLoad, setCognitiveLoad] = useState(2);
  const [physicalLoad, setPhysicalLoad] = useState(2);
  const [activityType, setActivityType] = useState();
  const [activityQualifier, setActivityQualifier] = useState();
  const [startDate, setStartDate] = useState(getRoundedDate());
  const [startMode, setStartMode] = useState('date');
  const [startShow, setStartShow] = useState(false);
  const [endDate, setEndDate] = useState(getRoundedDate());
  const [endMode, setEndMode] = useState('date');
  const [endShow, setEndShow] = useState(false);

  const onStartChange = (_, selectedDate) => {
    const currentDate = selectedDate;
    setStartShow(false);
    setStartDate(getRoundedDate(currentDate));
  };

  const showStartMode = (currentMode) => {
    setStartShow(true);
    setStartMode(currentMode);
  }

  const showStartDatePicker = () => {
    showStartMode('date');
  };

  const showStartTimePicker = () => {
    showStartMode('time');
  };

  const onEndChange = (_, selectedDate) => {
    const currentDate = selectedDate;
    setEndShow(false);
    setEndDate(getRoundedDate(currentDate));
  };

  const showEndMode = (currentMode) => {
    setEndShow(true);
    setEndMode(currentMode);
  }

  const showEndDatePicker = () => {
    showEndMode('date');
  };

  const showEndTimePicker = () => {
    showEndMode('time');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        height: 40,
        margin: 10,
      }}>
        <TextInput
          style={{
            backgroundColor: "#FFFFFF",
            fontSize: 20,
          }}
          placeholder="Activity Name"
        />
      </View>
      <Text style={styles.h2}>Start Time</Text>
      <Text style={styles.h3}>{startDate.toString()}</Text>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <View style={{ flex: 0.5 }}>
          <Button onPress={showStartDatePicker} title="Set date" color="#888" />
        </View>
        <View style={{ flex: 0.5 }}>
          <Button onPress={showStartTimePicker} title="Set time" />
        </View>
      </View>
      {startShow &&
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode={startMode}
          is24Hour={true}
          onChange={onStartChange}
        />
      }
      <Text style={styles.h2}>End Time</Text>
      <Text style={styles.h3}>{endDate.toString()}</Text>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <View style={{ flex: 0.5 }}>
          <Button onPress={showEndDatePicker} title="Set date" color="#888" />
        </View>
        <View style={{ flex: 0.5 }}>
          <Button onPress={showEndTimePicker} title="Set time" />
        </View>
      </View>
      {endShow &&
        <DateTimePicker
          testID="dateTimePicker"
          value={endDate}
          mode={endMode}
          is24Hour={true}
          onChange={onEndChange}
        />
      }
      {MyButtonGroup("Cognitive Load", cognitiveLoad, setCognitiveLoad)}
      {MyButtonGroup("Physical Load", physicalLoad, setPhysicalLoad)}
      {MyButtonGroup("Category", activityType, setActivityType,
        ["necessary", "leisure", "rest", "productive", "social",]
      )}
      {MyButtonGroup("Modifier", activityQualifier, setActivityQualifier,
        ["phone", "screen", "exercise", "boost", "misc",]
      )}

      {FooterButton(navigation, saveActivity, "Saved activity")}
    </SafeAreaView>
  );
};

export default ActivityScreen;
