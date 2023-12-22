import { View } from "react-native";
import { Button } from "react-native";

const FooterButton = (navigation, action) => {
  return (
    <View style={{
      justifyContent: "flex-end",
      flex: 1,
      paddingBottom: 10,
    }}>
      <View style={{
        flexDirection: "row",
        alignContent: "stretch",
        justifyContent: "center",
      }}>
        <View style={{
          flex: 1,
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
          flex: 1,
        }}>
          <Button
            onPress={() => {
              console.log(action);
            }}
            title="Save"
          />
        </View>
      </View>
    </View>
  )
};

export default FooterButton;
