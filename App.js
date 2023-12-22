import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from 'expo-sqlite';
import HomeScreen from './screens/home';
import LogsScreen from './screens/logs';
import ActivityScreen from './screens/activity';
import SymptomsScreen from './screens/symptoms';
import DataScreen from './screens/data';
import PlotsScreen from './screens/plots';
import { useEffect } from 'react';


const Stack = createNativeStackNavigator()
const db = SQLite.openDatabase("spooncalc-rn.db");

export default function App() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "createt table if not exists items (id integer primary key not null, done int, value text);"
      );
    });
    console.log("Created db");
  }, []);

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
