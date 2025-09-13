import { View, Text, StyleSheet } from "react-native";

export default function LogScreen() {
  return (
    <View style={styles.container}>
      <Text>Show all logs</Text>
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
