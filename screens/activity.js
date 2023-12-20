import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { View, Text, Button, TextInput } from "react-native";
import { ButtonGroup } from "react-native-elements";

const getRoundedDate = (d = new Date()) => {
  const roundInMs = 1000 * 60 * 15;  // 15 minutes in milliseconds
  const roundedDate = new Date(Math.round(d.getTime() / roundInMs) * roundInMs);
  return roundedDate;
};

const ActivityScreen = ({ navigation }) => {
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

  const onStartChange = (event, selectedDate) => {
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

  const onEndChange = (event, selectedDate) => {
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
    <SafeAreaView>
      <Text style={styles.h1}>Log Activity</Text>
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
      <Text style={styles.h2}>Cognitive Load</Text>
      <ButtonGroup
        buttons={["VERY_LOW", "LOW", "MID", "HIGH", "VERY_HIGH"]}
        selectedIndex={cognitiveLoad}
        onPress={(value) => {
          setCognitiveLoad(value);
        }}
      />
      <Text style={styles.h2}>Physical Load</Text>
      <ButtonGroup
        buttons={["VERY_LOW", "LOW", "MID", "HIGH", "VERY_HIGH"]}
        selectedIndex={physicalLoad}
        onPress={(value) => {
          setPhysicalLoad(value);
        }}
      />
      <Text style={styles.h2}>Category</Text>
      <ButtonGroup
        buttons={[
          "necessary",
          "leisure",
          "rest",
          "productive",
          "social",
        ]}
        selectedIndex={activityType}
        onPress={(value) => {
          setActivityType(value);
        }}
      />
      <Text style={styles.h2}>Modifier</Text>
      < ButtonGroup
        buttons={
          [
            "phone",
            "screen",
            "exercise",
            "boost",
            "misc",
          ]}
        selectedIndex={activityQualifier}
        onPress={(value) => {
          setActivityQualifier(value);
        }}
      />
      <View style={{
        flexDirection: "row",
        // alignItems: "center",
        alignContent: "stretch",
        justifyContent: "center",
        // flex: 1,
      }}>
        <View style={{
          flex: 0.5,
        }}>
          <Button
            onPress={() => {
              console.log("Cancel");
              navigation.navigate("Home");
            }}
            title="Cancel"
            color="#888888"
          />
        </View>
        <View style={{
          flex: 0.5,
        }}>
          <Button
            onPress={() => {
              console.log("Save");
            }}
            title="Save"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

styles = {
  h1: {
    textAlign: "center",
    fontSize: 40,
  },
  h2: {
    textAlign: "center",
    fontSize: 20,
  },
  h3: {
    textAlign: "center",
    fontSize: 15,
  }
}

export default ActivityScreen;
