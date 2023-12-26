import { ButtonGroup } from "react-native-elements";
import styles from "../styles";
import { Text } from "react-native";

const MyButtonGroup = (title, selected, callback, options = null) => {
  let buttonOptions = ["NONE", "LOW", "MID", "HIGH", "VERY_HIGH"];
  if (options !== null) {
    buttonOptions = options;
  }
  return (
    <>
      <Text style={styles.h2}>{title}</Text>
      <ButtonGroup
        buttons={buttonOptions}
        selectedIndex={selected}
        onPress={callback}
      />
    </>
  )
};

export default MyButtonGroup;
