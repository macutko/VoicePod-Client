import * as React from "react";
import * as layout from "../../components/constants/Layout";

import { StyleSheet, Text, View } from "react-native";

import { colorScheme } from "../../components/constants/Colors";

const WelcomeScreenLogo = (props) => {
  return (
    <View style={styles.outline}>
      <Text style={styles.text}>Conzlt</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    backgroundColor: colorScheme.secondary,
    padding: layout.default.window.width * 0.05,
    paddingTop: layout.default.window.width * 0.05,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 50,
    fontFamily: "Cutive-Regular",
    paddingTop: 10,
    color: colorScheme.white
  }
});

export default WelcomeScreenLogo;