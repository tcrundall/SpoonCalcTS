import { Button } from "react-native";

const LogsScreen = ({ navigation }) => {
  return (
    <>
      <Button
        onPress={() => {
          console.log("Logs");
        }}
        title="Logs"
      />
    </>
  );
};

export default LogsScreen;
