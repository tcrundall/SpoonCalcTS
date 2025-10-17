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
    <View style={styles.view}>
      <View style={styles.activityLogger}>
        <View style={styles.inputContainer}>
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
              <Text style={styles.buttonText}>Necessary</Text>,
              <Text style={styles.buttonText}>Productive</Text>,
              <Text style={styles.buttonText}>Leisure</Text>,
              <Text style={styles.buttonText}>Ex</Text>,
              <Text style={styles.buttonText}>Something</Text>,
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
              <Text style={styles.buttonText}>Phone</Text>,
              <Text style={styles.buttonText}>Screen</Text>,
              <Text style={styles.buttonText}>Exercise</Text>,
              <Text style={styles.buttonText}>Ex</Text>,
              <Text style={styles.buttonText}>Something</Text>,
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
        </View>
        <View style={styles.actionButtons}>
          <View style={styles.actionButton}>
            <Button
              title={"cancel"}
              onPress={() => {
                console.log("Cancelling...");
              }}
            />
          </View>
          <View style={styles.actionButton}>
            <Button
              title={"save"}
              onPress={() => {
                console.log(activityName);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    borderWidth: 5,
    borderColor: "purple",
    backgroundColor: "grey",
  },
  activityLogger: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    borderWidth: 5,
    borderColor: "orange",
    minWidth: 200,
    maxWidth: 400,
  },
  inputContainer: {
    flex: 1,
    borderWidth: 5,
    // minWidth: 300,
    // maxWidth: 1000,
    // maxHeight: 10000,
    flexDirection: "column",
    // justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "green",
  },
  actionButtons: {
    // maxHeight: 90,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderWidth: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    flex: 1,
    maxHeight: 40,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  selectedButton: {},
  buttonInGroup: {
    margin: 1,
    flexDirection: "column",
    alignSelf: "stretch",
  },
  actionButton: {
    flex: 1,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 10,
  },
  subTitleBox: {
    minHeight: 10,
    // padding: 5,
    margin: 5,
    // alignSelf: "stretch",
    justifyContent: "center",
    // backgroundColor: "purple",
  },
  subTitle: {
    fontSize: 20,
  },
  padding: {
    flex: 8,
  },
  margin: {
    alignSelf: "stretch",
    flexGrow: 0,
  },
});
