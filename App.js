import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/home';
import LogsScreen from './screens/logs';
import ActivityScreen from './screens/activity';
import DataScreen from './screens/data';
import PlotsScreen from './screens/plots';


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Log Activity"
          component={ActivityScreen}
        />
        <Stack.Screen
          name="Data"
          component={DataScreen}
        />
        <Stack.Screen
          name="Logs"
          component={LogsScreen}
        />
        <Stack.Screen
          name="Plots"
          component={PlotsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
