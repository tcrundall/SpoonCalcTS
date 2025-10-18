import { formatActivityDto } from "@/mappers/activity";
import { getActivities } from "@/storage/database.native";
import { View, Text, StyleSheet } from "react-native";

const borderWidth = 5;

const todayActivities = getActivities();

export default function LogScreen() {
  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={{ fontSize: 30, alignSelf: "center" }}>Today's Log</Text>
        </View>
        <View style={styles.contentBox}>
          {todayActivities.map((activity) => (
            <Text key={activity.id}>{formatActivityDto(activity)}</Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "yellow",
    flexDirection: "row",
    borderWidth: borderWidth,
  },
  container: {
    flexDirection: "column",
    flex: 1,
    maxWidth: 600,
    borderWidth: borderWidth,
  },
  titleBox: {
    flex: 0.1,
    borderWidth: borderWidth,
    maxHeight: 50,
  },
  contentBox: {
    flex: 1,
    borderWidth: borderWidth,
  },
});
