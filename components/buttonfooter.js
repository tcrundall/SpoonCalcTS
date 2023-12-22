import { View } from "react-native";
import { Button } from "react-native";

const FooterButton = (navigation, action) => {
  return (
    <View style={{
      flexDirection: "row",
      alignContent: "stretch",
      justifyContent: "center",
    }}>
      <View style={{
        flex: 0.5,
      }}>
        <Button
          onPress={() => {
            console.log("Cancel");
            navigation.navigate("Home");
          }}
          title="Cancel"
          color="#888888"
        />
      </View>
      <View style={{
        flex: 0.5,
      }}>
        <Button
          onPress={() => {
            console.log(action);
          }}
          title="Save"
        />
      </View>
    </View>
  )
};

export default FooterButton;
