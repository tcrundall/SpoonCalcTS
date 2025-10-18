import { Button } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { getAllAcitivites } from "@/storage/database";
import { getNowWithoutTZ } from "@/time/time";

const borderWidth = 5;

export default function DataScreen() {
  const exportDatabase = async () => {
    // save database to a csv
    const documentDir = FileSystem.documentDirectory as string;
    const activities = getAllAcitivites();
    const csvContents = activities
      .map(
        (a) =>
          `${a.id},${a.name},${a.cognitiveLoad},${a.physicalLoad},${a.type},${a.qualifier},${a.startDate},${a.endDate}`,
      )
      .join("\n");

    const date = getNowWithoutTZ().toISODate();
    const csvUri = documentDir + `${date}-all-activities.csv`;
    FileSystem.writeAsStringAsync(csvUri, csvContents);

    // open share dialog
    Sharing.shareAsync(csvUri);
  };

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <View style={styles.container}>
            <Text style={{ fontSize: 20, alignSelf: "center" }}>
              Manage data
            </Text>
          </View>
        </View>
        <View style={styles.contentBox}>
          <Button title="Export" onPress={exportDatabase} />
          <Button title="Import" />
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
    justifyContent: "center",
  },
});
