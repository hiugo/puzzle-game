import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { COLORS } from "./src/Constants";

import Puzzle from "./src/Puzzle";

function App() {
  return (
    <View style={styles.container}>
      <Puzzle />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
