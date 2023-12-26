import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { View } from "react-native";
import MyButtonGroup from "../components/buttongroup";
import FooterButton from "../components/buttonfooter";
import Database from "../database";

db = Database.getConnection();

const saveSymptoms = (s) => {
  console.log("Saving symptoms...");
  db.transaction((tx) => {
    tx.executeSql("select * from symptoms;", [], (_, { rows }) => { console.log(JSON.stringify(rows)) })
    tx.executeSql(
      `
      insert into symptoms
      (
        pain,
        nausea,
        fatigue,
        fluLike,
        sleepy,
        datetime
      ) values (
        "${s.pain}",
        "${s.nausea}",
        "${s.fatigue}",
        "${s.fluLike}",
        "${s.sleepy}",
        "${new Date()}"
      )
      `
    );
    tx.executeSql("select * from symptoms;", [], (_, { rows }) => { console.log(JSON.stringify(rows)) })
  }
  );
};

const SymptomsScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction((tx) => {
      // tx.executeSql("drop table symptoms");
      tx.executeSql(`
        create table if not exists symptoms
        (
          id integer primary key not null,
          pain int,
          nausea int,
          fatigue int,
          fluLike int,
          sleepy int,
          datetime datetime
        );
        `);
      tx.executeSql("select * from symptoms;", [], (_, { rows }) =>
        console.log(JSON.stringify(rows)));
    });
  }, []);

  const [pain, setPain] = useState();
  const [nausea, setNausea] = useState();
  const [fatigue, setFatigue] = useState();
  const [fluLike, setFluLike] = useState();
  const [sleepy, setSleepy] = useState();

  const symptoms = {
    pain,
    nausea,
    fatigue,
    fluLike,
    sleepy,
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 9, margin: 5, }}>
        {MyButtonGroup("Pain", pain, setPain)}
        {MyButtonGroup("Nausea", nausea, setNausea)}
        {MyButtonGroup("Fatigue", fatigue, setFatigue)}
        {MyButtonGroup("FluLike", fluLike, setFluLike)}
        {MyButtonGroup("Sleepy", sleepy, setSleepy)}
      </View>

      <View style={{ flex: 1 }}>
        {FooterButton(navigation, saveSymptoms, symptoms)}
      </View>
    </SafeAreaView>
  );
};


export default SymptomsScreen;
