import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { View } from "react-native";
import MyButtonGroup from "../components/buttongroup";
import FooterButton from "../components/buttonfooter";
import Database, { createSymptomsTable, saveSymptoms } from "../database";

db = Database.getConnection();

const SymptomsScreen = ({ navigation }) => {

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
