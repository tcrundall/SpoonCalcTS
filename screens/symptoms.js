import { useState } from "react";
import { SafeAreaView } from "react-native";
import { View, Button } from "react-native";
import MyButtonGroup from "../components/buttongroup";
import FooterButton from "../components/buttonfooter";

const SymptomsScreen = ({ navigation }) => {
  const [pain, setPain] = useState();
  const [nausea, setNausea] = useState();
  const [fatigue, setFatigue] = useState();
  const [fluLike, setFluLike] = useState();
  return (
    <SafeAreaView>
      {MyButtonGroup("Pain", pain, setPain)}
      {MyButtonGroup("Nausea", nausea, setNausea)}
      {MyButtonGroup("Fatigue", fatigue, setFatigue)}
      {MyButtonGroup("FluLike", fluLike, setFluLike)}

      {FooterButton(navigation, "Saved symptoms")}
    </SafeAreaView>
  );
};


export default SymptomsScreen;
