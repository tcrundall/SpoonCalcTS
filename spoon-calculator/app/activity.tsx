import { View, Text, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";
import { ButtonGroup } from "@rneui/themed";

export default function LogScreen() {
  const [activityName, setActivityName] = useState("");
  const [physLoadIndex, setPhysLoadIndex] = useState(null);
  const [cogLoadIndex, setCogLoadIndex] = useState(null);
  const [typeIndex, setTypeIndex] = useState(null);
  const [qualifierIndex, setQualifierIndex] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Log an activity</Text>
      <TextInput
        autoFocus={true}
        placeholder="Activity name"
        onChangeText={setActivityName}
        style={{
          backgroundColor: "white",
          padding: 10,
          alignSelf: "stretch",
          margin: 15,
        }}
      ></TextInput>
      <View style={styles.subTitleBox}>
        <Text style={styles.subTitle}>Cognitive load</Text>
      </View>
      <ButtonGroup
        containerStyle={styles.buttonGroup}
        buttonStyle={styles.buttonInGroup}
        selectedButtonStyle={styles.selectedButton}
        buttons={[
          <Text>0</Text>,
          <Text>0.5</Text>,
          <Text>1</Text>,
          <Text>1.5</Text>,
          <Text>2</Text>,
        ]}
        selectedIndex={physLoadIndex}
        onPress={setPhysLoadIndex}
      />
      <View style={styles.subTitleBox}>
        <Text style={styles.subTitle}>Physical load</Text>
      </View>
      <ButtonGroup
        containerStyle={styles.buttonGroup}
        buttonStyle={styles.buttonInGroup}
        selectedButtonStyle={styles.selectedButton}
        buttons={[
          <Text>0</Text>,
          <Text>0.5</Text>,
          <Text>1</Text>,
          <Text>1.5</Text>,
          <Text>2</Text>,
        ]}
        selectedIndex={cogLoadIndex}
        onPress={setCogLoadIndex}
      />
      <View style={styles.subTitleBox}>
        <Text style={styles.subTitle}>Activity Type</Text>
      </View>
      <ButtonGroup
        containerStyle={styles.buttonGroup}
        buttonStyle={styles.buttonInGroup}
        selectedButtonStyle={styles.selectedButton}
        buttons={[
          <Text>Necessary</Text>,
          <Text>Productive</Text>,
          <Text>Leisure</Text>,
          <Text>Ex</Text>,
          <Text>Something</Text>,
        ]}
        selectedIndex={typeIndex}
        onPress={(arg) => {
          if (arg === typeIndex) {
            setTypeIndex(null);
          } else {
            setTypeIndex(arg);
          }
        }}
      />
      <View style={styles.subTitleBox}>
        <Text style={styles.subTitle}>Activity Qualifier</Text>
      </View>
      <ButtonGroup
        containerStyle={styles.buttonGroup}
        buttonStyle={styles.buttonInGroup}
        selectedButtonStyle={styles.selectedButton}
        buttons={[
          <Text>Phone</Text>,
          <Text>Screen</Text>,
          <Text>Exercise</Text>,
          <Text>Ex</Text>,
          <Text>Something</Text>,
        ]}
        selectedIndex={qualifierIndex}
        onPress={(arg) => {
          if (arg === qualifierIndex) {
            setQualifierIndex(null);
          } else {
            setQualifierIndex(arg);
          }
        }}
      />
      <Button
        title={"save"}
        onPress={() => {
          console.log(activityName);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   flexDirection: "column",
    //   justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "grey",
    alignSelf: "stretch",
  },
  buttonList2: {
    // width: 100,
    // height: 50,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "green",
  },
  space: {
    width: 20,
    height: 20,
  },
  buttonList: {
    // width: 100,
    // height: 50,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "blue",
  },
  buttonGroup: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  selectedButton: {
    backgroundColor: "#e2e2e2",
  },
  buttonInGroup: {
    // padding: 9,
    margin: 1,
    flexDirection: "column",
    // backgroundColor: "pink",
    alignSelf: "stretch",
    // width: 80,
  },
  subTitleBox: {
    height: 30,
    padding: 10,
    // margin: 5,
    // alignSelf: "stretch",
    justifyContent: "center",
    // backgroundColor: "purple",
  },
  subTitle: {
    fontSize: 20,
  },
});
