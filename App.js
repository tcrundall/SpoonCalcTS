import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/home';
import LogsScreen from './src/screens/logs';
import ActivityScreen from './src/screens/activity';
import SymptomsScreen from './src/screens/symptoms';
import DataScreen from './src/screens/data';
import PlotsScreen from './src/screens/plots';


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
          name="Log Symptoms"
          component={SymptomsScreen}
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
