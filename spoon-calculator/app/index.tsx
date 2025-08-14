import { View, Text, StyleSheet } from 'react-native';
import { Button } from "react-native-elements";
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Spoon!</Text>
      <Button>Some thing</Button>
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
