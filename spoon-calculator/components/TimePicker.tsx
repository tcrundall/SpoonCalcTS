import { View, Text, StyleSheet, Button } from "react-native";
import {
  decrement15Mins,
  decrement1Hour,
  formatDate,
  formatTime,
  increment15Mins,
  increment1Hour,
} from "@/time/time";
import { DateTime } from "luxon";
import React from "react";

const borderWidth = 0;

export default function TimePicker({
  time,
  setTime,
}: {
  time: DateTime;
  setTime: (time: DateTime) => void;
}) {
  return (
    <View style={styles.box1}>
      <View style={styles.button}>
        <Button title="-1:00" onPress={() => setTime(decrement1Hour(time))} />
      </View>
      <View style={styles.button}>
        <Button title="-0:15" onPress={() => setTime(decrement15Mins(time))} />
      </View>
      <View style={styles.timeDisplay}>
        <Text>{formatTime(time) + formatDate(time)}</Text>
      </View>
      <View style={styles.button}>
        <Button title="+0:15" onPress={() => setTime(increment15Mins(time))} />
      </View>
      <View style={styles.button}>
        <Button title="+1:00" onPress={() => setTime(increment1Hour(time))} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    borderWidth: borderWidth,
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
    alignSelf: "stretch",
    flexDirection: "row",
    borderWidth: borderWidth,
    borderColor: "blue",
  },
  button: {
    flex: 1,
    fontSize: 20,
    borderWidth: borderWidth,
    borderColor: "purple",
    justifyContent: "center",
  },
  timeDisplay: {
    flex: 1,
    justifyContent: "center",
    fontSize: 10,
    alignItems: "center",
    borderWidth: borderWidth,
    borderColor: "red",
  },
  box2: {
    backgroundColor: "blue",
  },
  box3: {
    backgroundColor: "yellow",
  },
});
