import { Text, View, Image, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
  const averageDailyTotal = 30;
  const currentDayTotal = 28;
  return (
    <>
      <View style={{
        alignContent: "center",
        justifyContent: "center",
        padding: 10
      }}>
        <Text style={{
          fontSize: 35,
          textAlign: "center",
        }}>{currentDayTotal}/{averageDailyTotal}</Text>
      </View>
      <View style={{
        alignItems: "center",
      }}>
        <Image
          source={
            require('../assets/spoon_icon_splash.png')
          }
          style={{
            width: 300,
            height: 300,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>
      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
      }}>
        <View style={styles.buttonContainer}>
          < Button
            title="Go home...?"
            onPress={() => {
              console.log("Pressed!");
              navigation.navigate("Home");
            }}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
          />
        </View>
        <View style={styles.buttonContainer}>
          < Button
            title="Log Activity"
            onPress={() => {
              console.log("Pressed!");
              navigation.navigate("Log Activity");
            }}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
          />
        </View>
        <View style={styles.buttonContainer}>
          < Button
            title="Log Symptoms"
            onPress={() => {
              console.log("Pressed!");
              navigation.navigate("Log Symptoms");
            }}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
          />
        </View>
        <View style={styles.buttonContainer}>
          < Button
            title="Plots"
            onPress={() => {
              console.log("Pressed!");
              navigation.navigate("Plots");
            }}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
          />
        </View>
        <View style={styles.buttonContainer}>
          < Button
            title="Logs"
            onPress={() => {
              console.log("Pressed!");
              navigation.navigate("Logs");
            }}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
          />
        </View>
        <View style={styles.buttonContainer}>
          < Button
            title="Data"
            onPress={() => {
              console.log("Pressed!");
              navigation.navigate("Data");
            }}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    </>
  );
};

styles = StyleSheet.create({
  buttonTitle: {
    fontSize: 20,
  },
  button: {
    borderRadius: 25
  },
  buttonContainer: {
    margin: 10,
  },
})

export default HomeScreen;
