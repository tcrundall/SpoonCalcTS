import { Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      < Button
        title="Go home...?"
        onPress={() => {
          console.log("Pressed!");
          navigation.navigate("Home");
        }}
      />
      < Button
        title="Activity"
        onPress={() => {
          console.log("Pressed!");
          navigation.navigate("Activity");
        }}
      />
      < Button
        title="Plots"
        onPress={() => {
          console.log("Pressed!");
          navigation.navigate("Plots");
        }}
      />
      < Button
        title="Logs"
        onPress={() => {
          console.log("Pressed!");
          navigation.navigate("Logs");
        }}
      />
      < Button
        title="Data"
        onPress={() => {
          console.log("Pressed!");
          navigation.navigate("Data");
        }}
      />
    </>
  );
};

export default HomeScreen;
