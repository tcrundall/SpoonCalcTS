import { Button } from "react-native";

const DataScreen = ({ navigation }) => {
  return (
    <>
      <Button
        onPress={() => {
          console.log("Data");
        }}
        title="Data"
      />
    </>
  );
};

export default DataScreen;
