import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { View, Text, Button, TextInput } from "react-native";
import MyButtonGroup from "../components/buttongroup";
import FooterButton from "../components/buttonfooter";
import styles from "../styles";
import { saveActivity, updateActivity } from "../database";
import { getRoundedDate } from "../datetime";


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

  // const [forceUpdate, forceUpdateId] = useForceUpdate();
  const initialActivityFields = { ...defaultActivityFields, ...targetActivity }
  const [activity, setActivity] = useState(initialActivityFields);

  const [startMode, setStartMode] = useState('date');
  const [startShow, setStartShow] = useState(false);
  const [endMode, setEndMode] = useState('date');
  const [endShow, setEndShow] = useState(false);

  console.log(`Activity has name: ${activity.name} `);

  const onStartChange = (_, selectedDate) => {
    setStartShow(false);
    setActivity({ ...activity, ...{ startDate: getRoundedDate(selectedDate) } })
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
    setEndShow(false);
    setActivity({ ...activity, ...{ endDate: getRoundedDate(selectedDate) } })
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
          onChangeText={(name) => { setActivity({ ...activity, ...{ name: name } }) }}
          value={activity.name}
        />
      </View>
      <Text style={styles.h2}>Start Time</Text>
      <Text style={styles.h3}>{activity.startDate.toString()}</Text>
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
          value={activity.startDate}
          mode={startMode}
          is24Hour={true}
          onChange={onStartChange}
        />
      }
      <Text style={styles.h2}>End Time</Text>
      <Text style={styles.h3}>{activity.endDate.toString()}</Text>
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
          value={activity.endDate}
          mode={endMode}
          is24Hour={true}
          onChange={onEndChange}
        />
      }
      {MyButtonGroup(
        "Cognitive Load",
        activity.cognitiveLoad,
        (value) => { setActivity({ ...activity, ...{ cognitiveLoad: value } }) },
      )}
      {MyButtonGroup(
        "Physical Load",
        activity.physicalLoad,
        (value) => { setActivity({ ...activity, ...{ physicalLoad: value } }) },
      )}
      {MyButtonGroup(
        "Category",
        activity.type,
        (value) => { setActivity({ ...activity, ...{ type: value } }) },
        ["necessary", "leisure", "rest", "productive", "social",]
      )}
      {MyButtonGroup(
        "Modifier",
        activity.qualifier,
        (value) => { setActivity({ ...activity, ...{ qualifier: value } }) },
        ["phone", "screen", "exercise", "boost", "misc",]
      )}

      {FooterButton(navigation, isUpdate ? updateActivity : saveActivity, activity)}
    </SafeAreaView>
  );
};

export default ActivityScreen;
