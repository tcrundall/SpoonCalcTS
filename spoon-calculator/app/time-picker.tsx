import { View, Text, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import {
  decrement15Mins,
  decrement1Hour,
  formatDate,
  formatTime,
  increment15Mins,
  increment1Hour,
  nowWith15MinResolution,
} from "@/time/time";

export default function LogScreen() {
  const [startTime, setStartTime] = useState(nowWith15MinResolution());

  return (
    <View style={styles.view}>
      <View style={styles.box1}>
        <View style={styles.button}>
          <Button
            title="-1:00"
            onPress={() => setStartTime(decrement1Hour(startTime))}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="-0:15"
            onPress={() => setStartTime(decrement15Mins(startTime))}
          />
        </View>
        <View style={styles.timeDisplay}>
          {formatTime(startTime) + "\n" + formatDate(startTime)}
        </View>
        <View style={styles.button}>
          <Button
            title="+0:15"
            onPress={() => setStartTime(increment15Mins(startTime))}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="+1:00"
            onPress={() => setStartTime(increment1Hour(startTime))}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    borderWidth: 5,
    borderColor: "green",
    backgroundColor: "grey",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    // rowGap: 100,
  },
  box1: {
    maxHeight: 100,
    flex: 1,
    flexDirection: "row",
    borderWidth: 5,
    borderColor: "blue",
  },
  button: {
    flex: 1,
    fontSize: 20,
    borderWidth: 5,
    borderColor: "purple",
    justifyContent: "center",
  },
  timeDisplay: {
    flex: 1,
    justifyContent: "center",
    fontSize: 30,
    alignItems: "center",
    borderWidth: 5,
    borderColor: "red",
  },
  box2: {
    backgroundColor: "blue",
  },
  box3: {
    backgroundColor: "yellow",
  },
});
