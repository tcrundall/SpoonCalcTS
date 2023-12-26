import { Button, View } from "react-native";

const PlotsScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        onPress={() => {
          console.log("Plots");
        }}
        title="Plots"
      />
    </View>
  );
};

export default PlotsScreen;
