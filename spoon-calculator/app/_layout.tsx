import { Stack } from 'expo-router';
import 'react-native-reanimated';


export default function RootLayout() {
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

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
      <Stack.Screen name="activity" />
      <Stack.Screen name="data" />
      <Stack.Screen name="index" />
      <Stack.Screen name="logs" />
      <Stack.Screen name="plots" />
      <Stack.Screen name="symptoms" />
    </Stack>
    // <StatusBar style="auto" />
  );
}
