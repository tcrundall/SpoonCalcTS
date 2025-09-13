import { View, Text, StyleSheet, Alert, Button } from "react-native";
import { Link } from "expo-router";
import * as Storage from "@/storage/database";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>My Spoon!</Text>
      <Button
        title="Open database"
        onPress={() => {
          console.log("Opening database...");
          Storage.myOpenDatabase();
          console.log("Done");
        }}
      />
      <Button
        title="Add to database"
        onPress={() => {
          console.log("Adding to database...");
          Storage.addRow();
          console.log("Done");
        }}
      />
      <Button
        title="List database"
        onPress={() => {
          console.log("Listing to database...");
          Storage.listTable();
          console.log("Done");
        }}
      />
      <Button
        title="Open activities"
        onPress={() => {
          console.log("Opening activities...");
          Storage.createActivitiesTable();
          console.log("Done");
        }}
      />
      <Button
        title="Add to activities"
        onPress={() => {
          console.log("Adding to activities...");
          Storage.saveActivity({
            id: "",
            name: "asdf",
            cognitiveLoad: 1,
            physicalLoad: 1,
            type: "asd",
            qualifier: "asdf",
            startDate: "asdfad",
            endDate: "ASDF",
          });
          console.log("Done");
        }}
      />
      <Button
        title="List activities"
        onPress={() => {
          console.log("Listing to activities...");
          Storage.listActivities();
          console.log("Done");
        }}
      />
      <Link href="/activity">View activity</Link>
      <Link href="/data">View data</Link>
      <Link href="/logs">View logs</Link>
      <Link href="/plots">View plots</Link>
      <Link href="/symptoms">View symptoms</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
});
