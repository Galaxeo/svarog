import { StyleSheet } from "react-native";
export const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202023",
    // height: "100%",
    // width: "100%",
  },
  text: {
    color: "#e1e1e1",
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
  },
});

export const colors = {
  background: "#202023",
  text: "#e1e1e1",
  darkGray: "#b2b2b2",
  darkGray2: "#a5a5a5",
  darkGray3: "#989898",
  coralRed: '#FF746C',
  aqua: "aqua",
  lightGreen: "#88e788",
  backgroundTransparent: "rgba(32, 32, 35, .7)",
  backgroundTranslucent: "rgba(32, 32, 35, .9)",
};


export default s;
