import { View } from "react-native";
import { Button } from "react-native-elements";
import styles from "../styles";

const ButtonLink = (navigation, destination) => {
  return (
    <View style={styles.buttonContainer}>
      < Button
        title={destination}
        onPress={() => {
          console.log("Pressed!");
          navigation.navigate(destination);
        }}
        titleStyle={styles.buttonTitle}
        buttonStyle={styles.button}
      />
    </View>
  )
};

export default ButtonLink;
