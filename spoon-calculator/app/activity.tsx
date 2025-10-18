import { View, Text, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import { nowWith15MinResolution } from "@/time/time";
import TimePicker from "@/components/TimePicker";
import { DateTime } from "luxon";
import { saveActivity } from "@/storage/database";
import {
  activityQualifierMap,
  activityTypeMap,
  cognitiveLoadMap,
  mapActivityViewToActivityDto,
  physicalLoadMap,
} from "@/mappers/activity";

const borderWidth = 0;

export default function LogScreen() {
  const [activityName, setActivityName] = useState("");
  const [physLoadIndex, setPhysLoadIndex] = useState(0);
  const [cogLoadIndex, setCogLoadIndex] = useState(0);
  const [typeIndex, setTypeIndex] = useState(null);
  const [qualifierIndex, setQualifierIndex] = useState(null);
  const [startTime, setStartTime] = useState(nowWith15MinResolution());
  const [endTime, setEndTime] = useState(nowWith15MinResolution());

  return (
    <View style={styles.view}>
      <View style={styles.activityLogger}>
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 30, alignSelf: "center" }}>
            Log an activity!!!
          </Text>
          <TextInput
            autoFocus={true}
            placeholder="Activity name"
            onChangeText={setActivityName}
            style={{
              backgroundColor: "white",
              padding: 10,
              alignSelf: "stretch",
              margin: 15,
            }}
          ></TextInput>
          <View style={styles.subTitleBox}>
            <Text style={styles.subTitle}>Cognitive load</Text>
          </View>
          <ButtonGroup
            containerStyle={styles.buttonGroup}
            buttonStyle={styles.buttonInGroup}
            selectedButtonStyle={styles.selectedButton}
            buttons={cognitiveLoadMap.map((load: number) => (
              <Text key={load}>{load}</Text>
            ))}
            selectedIndex={physLoadIndex}
            onPress={setPhysLoadIndex}
          />
          <View style={styles.subTitleBox}>
            <Text style={styles.subTitle}>Physical load</Text>
          </View>
          <ButtonGroup
            containerStyle={styles.buttonGroup}
            buttonStyle={styles.buttonInGroup}
            selectedButtonStyle={styles.selectedButton}
            buttons={physicalLoadMap.map((load: number) => (
              <Text key={load}>{load}</Text>
            ))}
            selectedIndex={cogLoadIndex}
            onPress={setCogLoadIndex}
          />
          <View style={styles.subTitleBox}>
            <Text style={styles.subTitle}>Activity Type</Text>
          </View>
          <ButtonGroup
            containerStyle={styles.buttonGroup}
            buttonStyle={styles.buttonInGroup}
            selectedButtonStyle={styles.selectedButton}
            buttons={activityTypeMap.map((type: string) => (
              <Text style={styles.buttonText} key={type}>
                {type}
              </Text>
            ))}
            selectedIndex={typeIndex}
            onPress={(arg) => {
              if (arg === typeIndex) {
                setTypeIndex(null);
              } else {
                setTypeIndex(arg);
              }
            }}
          />
          <View style={styles.subTitleBox}>
            <Text style={styles.subTitle}>Activity Qualifier</Text>
          </View>
          <ButtonGroup
            containerStyle={styles.buttonGroup}
            buttonStyle={styles.buttonInGroup}
            selectedButtonStyle={styles.selectedButton}
            buttons={activityQualifierMap.map((qualifier: string) => (
              <Text style={styles.buttonText} key={qualifier}>
                {qualifier}
              </Text>
            ))}
            selectedIndex={qualifierIndex}
            onPress={(arg) => {
              if (arg === qualifierIndex) {
                setQualifierIndex(null);
              } else {
                setQualifierIndex(arg);
              }
            }}
          />
          <View style={styles.subTitleBox}>
            <Text style={styles.subTitle}>Start Time</Text>
          </View>
          <TimePicker
            time={startTime}
            setTime={(time: DateTime) => setStartTime(time)}
          />
          <View style={styles.subTitleBox}>
            <Text style={styles.subTitle}>End Time</Text>
          </View>
          <TimePicker
            time={endTime}
            setTime={(time: DateTime) => setEndTime(time)}
          />
        </View>
        <View style={styles.actionButtons}>
          <View style={styles.actionButton}>
            <Button
              title={"cancel"}
              onPress={() => {
                console.log("Cancelling...");
              }}
            />
          </View>
          <View style={styles.actionButton}>
            <Button
              title={"save"}
              onPress={() => {
                const activityView = {
                  activityName,
                  cogLoadIndex,
                  physLoadIndex,
                  typeIndex,
                  qualifierIndex,
                  startTime,
                  endTime,
                };
                saveActivity(mapActivityViewToActivityDto(activityView));
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    borderWidth: borderWidth,
    borderColor: "purple",
    backgroundColor: "grey",
  },
  activityLogger: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    borderWidth: borderWidth,
    borderColor: "orange",
    minWidth: 200,
    maxWidth: 400,
  },
  inputContainer: {
    flex: 1,
    borderWidth: borderWidth,
    flexDirection: "column",
    alignItems: "stretch",
    borderColor: "green",
  },
  actionButtons: {
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderWidth: borderWidth,
  },
  buttonGroup: {
    flexDirection: "row",
    flex: 1,
    maxHeight: 40,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  selectedButton: {},
  buttonInGroup: {
    margin: 1,
    flexDirection: "column",
    alignSelf: "stretch",
  },
  actionButton: {
    flex: 1,
    borderWidth: borderWidth,
  },
  buttonText: {
    fontSize: 10,
  },
  subTitleBox: {
    minHeight: 10,
    margin: 5,
    alignSelf: "center", // TODO: Understand how to center text instead of entire view
    // textAlign: "center",
    textAlignVertical: "bottom",
    borderWidth: borderWidth,
    borderColor: "orange",
  },
  subTitle: {
    fontSize: 20,
  },
  padding: {
    flex: 8,
  },
  margin: {
    alignSelf: "stretch",
    flexGrow: 0,
  },
});
