import { Text, View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import ButtonLink from "../components/buttonlink";
import styles from "../styles";

const HomeScreen = ({ navigation }) => {
  const averageDailyTotal = 30;
  const currentDayTotal = 28;
  return (
    <>
      <View style={{
        alignContent: "center",
        justifyContent: "center",
        padding: 10,
        flex: 0.1,
      }}>
        <Text style={styles.h1}>{currentDayTotal}/{averageDailyTotal}</Text>
      </View>
      <View style={{
        alignItems: "center",
        flex: 0.5,
      }}>
        <Image
          source={
            require("../assets/spoon_icon_splash.png")
          }
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>
      <View style={{ flex: 0.4 }}>
        <View style={{
          flex: 1,
          // justifyContent: "space-around",
          justifyContent: "space-evenly",
          marginHorizontal: 60,
          marginBottom: 0,
        }}>
          {ButtonLink(navigation, "Log Activity")}
          {ButtonLink(navigation, "Log Symptoms")}
          {ButtonLink(navigation, "Plots")}
          {ButtonLink(navigation, "Logs")}
          {ButtonLink(navigation, "Data")}
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
