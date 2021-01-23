import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
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
    height: 100,
    width: 270,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    // top: "12%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  text: {
    fontSize: 50,
    color: colorScheme.white
  }
});

export default WelcomeScreenLogo;