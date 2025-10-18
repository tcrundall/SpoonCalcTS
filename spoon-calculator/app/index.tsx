import { View, Text, StyleSheet, Button } from "react-native";
import { Link } from "expo-router";
import * as Storage from "storage/database";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>My Spoon!</Text>
      <Button
        title="List activities"
        onPress={() => {
          console.log("Listing to activities...");
          Storage.listActivities();
          console.log("Done");
        }}
      />
      <Link href="/activity">
        <Text style={{ fontSize: 40, backgroundColor: "white" }}>
          Log activity
        </Text>
      </Link>
      <Link href="/data">View data</Link>
      <Link href="/logs">
        <Text style={{ fontSize: 40, backgroundColor: "white" }}>
          View logs
        </Text>
      </Link>
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
    backgroundColor: "pink",
  },
});
