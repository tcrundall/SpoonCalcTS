import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { View, Text, Button, TextInput } from "react-native";
import MyButtonGroup from "../components/buttongroup";
import FooterButton from "../components/buttonfooter";
import styles from "../styles";
import { saveActivity, updateActivity } from "../database";
import { getRoundedDate } from "../datetime";


const setActivityField = (activity, field, updateCallback) => {
  console.log(`Constructing call back for field ${field}`);
  return (value) => {
    activity[field] = value;
    console.log(`Updated field: ${JSON.stringify(activity)}`);
    updateCallback(activity);
  }
};

const ActivityScreen = ({ navigation, route }) => {
  console.log(`Got params: ${JSON.stringify(route.params)}`);

  let targetActivity = {};
  let targetActivityId = null;
  let isUpdate = false;
  if (route?.params?.targetActivity !== undefined) {
    targetActivity = route.params.targetActivity;
    targetActivityId = targetActivity.id;
    isUpdate = true;
    console.log(`Got an activity! ${JSON.stringify(targetActivity)}`);
    console.log(`Updating? ${isUpdate}`);
  } else {
    console.log("No activity recieved");
  }

  const defaultActivityFields = {
    name: "Activity",
    cognitiveLoad: "2",
    physicalLoad: "3",
    type: null,
    qualifier: null,
    startDate: getRoundedDate(),
    endDate: getRoundedDate(),
  }

  const initialActivityFields = { ...defaultActivityFields, ...targetActivity }

  const [activityName, setActivityName] = useState(initialActivityFields.name);
  const [cognitiveLoad, setCognitiveLoad] = useState(initialActivityFields.cognitiveLoad);
  const [physicalLoad, setPhysicalLoad] = useState(initialActivityFields.physicalLoad);
  const [activityType, setActivityType] = useState(initialActivityFields.type);
  const [activityQualifier, setActivityQualifier] = useState(initialActivityFields.qualifier);
  const [startDate, setStartDate] = useState(new Date(initialActivityFields.startDate));
  const [endDate, setEndDate] = useState(new Date(initialActivityFields.endDate));

  const [startMode, setStartMode] = useState('date');
  const [startShow, setStartShow] = useState(false);
  const [endMode, setEndMode] = useState('date');
  const [endShow, setEndShow] = useState(false);

  const activity = {
    id: targetActivityId,
    name: activityName,
    cognitiveLoad: cognitiveLoad,
    physicalLoad: physicalLoad,
    type: activityType,
    qualifier: activityQualifier,
    startDate: startDate,
    endDate: endDate,
  }

  console.log(`Activity has name: ${activity.name} `);

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
          onChangeText={(name) => { setActivityName(name) }}
          value={activityName}
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

      {FooterButton(navigation, isUpdate ? updateActivity : saveActivity, activity)}
    </SafeAreaView>
  );
};

export default ActivityScreen;
