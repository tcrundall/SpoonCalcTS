import { formatActivityDto } from "@/mappers/activity";
import { getActivitiesOnDay } from "@/storage/database";
import { deleteActivity } from "@/storage/database";
import { getNowWithoutTZ } from "@/time/time";
import { Button } from "@rneui/themed";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const borderWidth = 0;

export default function LogScreen() {
  const [date, setDate] = useState(getNowWithoutTZ());
  const [deletionClicks, setDeletionClicks] = useState(0);
  const todayActivities = getActivitiesOnDay(date);

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Button
            title="<<"
            onPress={() => {
              setDate(date.minus({ days: 7 }));
            }}
          />
          <Button
            title="<"
            onPress={() => {
              setDate(date.minus({ days: 1 }));
            }}
          />
          <Button
            title="T"
            onPress={() => {
              setDate(getNowWithoutTZ());
            }}
          />
          <Text style={{ fontSize: 20, alignSelf: "center" }}>
            {date.toFormat("ccc dd-MM-yyyy")}
          </Text>
          <Button
            title=">"
            onPress={() => {
              setDate(date.plus({ days: 1 }));
            }}
          />
          <Button
            title=">>"
            onPress={() => {
              setDate(date.plus({ days: 7 }));
            }}
          />
        </View>
        <View style={styles.contentBox}>
          <Text>{"Name | start | end | cog | phys || total"}</Text>
          <ScrollView>
            {todayActivities.map((activity) => (
              <View key={activity.id} style={styles.activityRow}>
                <Text style={{ flex: 1 }}>{formatActivityDto(activity)}</Text>
                <Button
                  title="X"
                  titleStyle={{ fontSize: 10 }}
                  onPress={() => {
                    deleteActivity(activity.id);
                    setDeletionClicks(deletionClicks + 1);
                  }}
                />
              </View>
            ))}
          </ScrollView>
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
    backgroundColor: "pink",
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
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0.1,
    borderWidth: borderWidth,
    maxHeight: 50,
  },
  contentBox: {
    flex: 1,
    borderWidth: borderWidth,
  },
  activityRow: {
    flexDirection: "row",
  },
});
