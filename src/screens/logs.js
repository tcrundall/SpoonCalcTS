import { Pressable, Text, View } from "react-native";
// import { Button } from "react-native-elements";
import { Button } from "react-native";
import styles from "../styles";
import { ScrollView } from "react-native";
import Database from "../database";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal } from "react-native";
import * as dt from "../datetime";

const db = Database.getConnection();

const deleteActivity = (activityId, forceUpdate) => {
  db.transaction((tx) => {
    tx.executeSql(`delete from activities where id = "${activityId}";`);
  },
    null,
    forceUpdate,
  );
};

const useForceUpdate = () => {
  [value, setValue] = useState(0);
  return [() => { console.log("forcing update"); setValue(value + 1); }, value];
};

const LogsScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [dayOffset, setDayOffset] = useState(0);
  const [visible, setVisible] = useState(false);
  const [targetActivity, setTargetActivity] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  const hide = () => { setVisible(false) };
  const show = () => { setVisible(true) };

  useEffect(
    () => {
      db.transaction((tx) => {
        const currentDay = dt.getDayStartFromOffset(dayOffset);
        const followingDay = dt.addDays(currentDay, 1);
        tx.executeSql(`select * from activities where start between '${currentDay.toISOString()}' and '${followingDay.toISOString()}';`, [], (_, { rows }) => {
          console.log(JSON.stringify(rows));
          setItems(rows._array);
        });
      });
    },
    [dayOffset, forceUpdateId],
    null,
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...{ flex: 1 }, ...styles.debug }}>
        <View style={{ ...{ flexDirection: "row", flex: 0.1 }, ...styles.debug }}>
          <View style={{ ...{ flex: 1 }, ...styles.debug }}>
            <Button
              title="<"
              onPress={() => {
                setDayOffset(dayOffset - 1);
              }}

            />
          </View>
          <Text style={{ ...styles.h1, ...{ flex: 8 } }}>{dt.getDayStartFromOffset(dayOffset).toLocaleDateString()}</Text>
          <View style={{ ...{ flex: 1 }, ...styles.debug }}>
            <Button
              title=">"
              onPress={() => {
                setDayOffset(dayOffset + 1);
              }}
            />
          </View>
        </View>
        <ScrollView style={{ flex: 1, borderTopWidth: 2, borderTopColor: "white" }}>
          <View style={{
            ...{
              justifyContent: "flex",
              flexDirection: "row",
              borderBottomWidth: 2,
              borderBottomColor: "white",
            },
            ...styles.debug
          }}>
            <Text style={{ ...styles.h4, ...{ flex: 2 } }}>Time</Text>
            <Text style={{ ...styles.h4, ...{ flex: 1 } }}>Id</Text>
            <Text style={{ ...styles.h4, ...{ flex: 5 } }}>Name</Text>
            <Text style={{ ...styles.h4, ...{ flex: 1 } }}>Cog.</Text>
            <Text style={{ ...styles.h4, ...{ flex: 1 } }}>Phys.</Text>
            <Text style={{ ...styles.h4, ...{ flex: 1 } }}>Edit</Text>
            <Text style={{ ...styles.h4, ...{ flex: 1 } }}>Del.</Text>
          </View>
          {items.map((a) => (
            <View key={a.id} style={{
              ...{
                justifyContent: "flex",
                flexDirection: "row",
                borderBottomWidth: 2,
                borderBottomColor: "white",
              },
              ...styles.debug
            }}>
              <View style={{ ...{ flex: 2, }, ...styles.debug }}>
                <Text style={styles.debug}>{dt.getTimeFromIsoString(a.start)}</Text>
                <Text style={styles.debug}> - {dt.getTimeFromIsoString(a.end)}</Text>
              </View>
              <Text style={{ ...styles.h2, ...{ flex: 1 } }}>{a.id}</Text>
              <Text style={{ ...styles.h2, ...{ flex: 5 } }}>{a.name}</Text>
              <Text style={{ ...styles.h2, ...{ flex: 1 } }}>{a.cognitiveLoad}</Text>
              <Text style={{ ...styles.h2, ...{ flex: 1 } }}>{a.physicalLoad}</Text>
              <View style={{ flex: 1 }}>
                <Button
                  title="E"
                  onPress={() => {
                    console.log(`Editing ${a.name}!`);
                    navigation.navigate("Log Activity", { targetActivity: a });
                  }}
                  style={{ flex: 1 }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="X"
                  onPress={() => {
                    setTargetActivity(a);
                    console.log(`Deleting ${a.name}!`);
                    show();
                    console.log(`Deleted ${a.name}!`);
                  }}
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          ))
          }
        </ScrollView >
        <Button
          onPress={() => {
            console.log("Logs");
            navigation.navigate("Home");
          }}
          title="Back"
          style={{ backgroundColor: "red", flex: 1 }}
        />
      </View >
      <Modal
        visible={visible}
        onRequestClose={hide}
        transparent
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Pressable
            onPress={hide}
            style={{
              flex: 5,
              backgroundColor: "#DDD",
              opacity: 0.5,
            }}
          />
          <View style={{
            flex: 1,
            backgroundColor: "#EEE",
            opacity: 1,
          }}
          >
            <Text style={styles.h1}>Delete {targetActivity?.name}?</Text>
            <View style={{ flex: 1, justifyContent: "center", flexDirection: "row", alignContent: "stretch" }}>
              <View style={{ flex: 1 }}>
                <Button
                  title="Cancel"
                  color="#888"
                  onPress={() => { console.log("CANCELING!!!"); hide() }}
                  style={{ backgroundColor: "red", flex: 1 }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  title="Confirm"
                  onPress={() => {
                    console.log("DELETING!!!");
                    deleteActivity(targetActivity.id, forceUpdate);
                    hide()
                  }}
                  style={{ backgroundColor: "red", flex: 1 }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default LogsScreen;
