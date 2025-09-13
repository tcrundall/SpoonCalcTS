import { View, Text, StyleSheet } from "react-native";

export default function LogScreen() {
  return (
    <View style={styles.container}>
      <Text>Manage data</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
});
