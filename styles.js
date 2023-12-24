import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: 20,
  },
  button: {
    borderRadius: 25
  },
  buttonContainer: {
    marginHorizontal: 0,
  },
  h1: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 40,
  },
  h2: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
  },
  h3: {
    textAlign: "center",
    fontSize: 15,
    textAlignVertical: "center",
  },
  h4: {
    textAlign: "center",
    fontSize: 13,
    textAlignVertical: "center",
  },
  debug: {
    // borderWidth: 3,
    // borderColor: "black",
  }
})

for (const key in styles) {
  if (key !== "debug") {
    styles[key] = { ...styles[key], ...styles.debug };
  }
}

export default styles;
