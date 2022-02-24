import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Puzzle from "./src/Puzzle";

export default function App() {
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
