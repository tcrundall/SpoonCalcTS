import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { View, Text, Button, TextInput } from "react-native";
import { ButtonGroup } from "react-native-elements";


const SymptomsScreen = ({ navigation }) => {
  const [pain, setPain] = useState();
  const [nausea, setNausea] = useState();
  const [fatigue, setFatigue] = useState();
  const [fluLike, setFluLike] = useState();
  return (
    <SafeAreaView>
      <Text style={styles.h2}>Pain</Text>
      <ButtonGroup
        buttons={["NONE", "LOW", "MID", "HIGH", "VERY_HIGH"]}
        selectedIndex={pain}
        onPress={(value) => {
          setPain(value);
        }}
      />
      <Text style={styles.h2}>Nausea</Text>
      <ButtonGroup
        buttons={["NONE", "LOW", "MID", "HIGH", "VERY_HIGH"]}
        selectedIndex={nausea}
        onPress={(value) => {
          setNausea(value);
        }}
      />
      <Text style={styles.h2}>Fatigue</Text>
      <ButtonGroup
        buttons={["NONE", "LOW", "MID", "HIGH", "VERY_HIGH"]}
        selectedIndex={fatigue}
        onPress={(value) => {
          setFatigue(value);
        }}
      />
      <Text style={styles.h2}>Flu Like</Text>
      <ButtonGroup
        buttons={["NONE", "LOW", "MID", "HIGH", "VERY_HIGH"]}
        selectedIndex={fluLike}
        onPress={(value) => {
          setFluLike(value);
        }}
      />
      <View style={{
        flexDirection: "row",
        // alignItems: "center",
        alignContent: "stretch",
        justifyContent: "center",
        // flex: 1,
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
              console.log("Save");
            }}
            title="Save"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

styles = StyleSheet.create({
  h1: {
    textAlign: "center",
    fontSize: 40,
  },
  h2: {
    textAlign: "center",
    fontSize: 20,
  },
  h3: {
    textAlign: "center",
    fontSize: 15,
  }
})

export default SymptomsScreen;
