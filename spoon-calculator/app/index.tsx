import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { Link } from 'expo-router';
import { logToConsole } from '@/storage/database';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Spoon!</Text>
      <Button title="Send alert" onPress={() => {
        console.log("Presssed!");
        logToConsole("Hallo");
        console.log("Presssed 2!");
      }} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
});
