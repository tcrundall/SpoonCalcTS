import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useEffect } from "react";
import * as Storage from "../storage/database";

export default function RootLayout() {
  useEffect(() => {
    (async () => {
      await Storage.initialiseDatabase();
    })();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
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
