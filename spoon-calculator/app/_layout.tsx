import { Stack } from "expo-router";
import "react-native-reanimated";
import * as Storage from "storage/database";

export default function RootLayout() {
  (async () => {
    await Storage.createActivitiesTable();
  })();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="activity" />
      <Stack.Screen name="data" />
      <Stack.Screen name="logs" />
      <Stack.Screen name="plots" />
      <Stack.Screen name="symptoms" />
    </Stack>
    // <StatusBar style="auto" />
  );
}
