import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { colorScheme } from "../../constants/Colors";

const ButtonCustom = (props) => {
  return (
    <Button
      mode={props.text ? "text" : "contained"}
      uppercase={false}
      style={[
        styles.button,
        props.text && styles.text,
        props.spaced && styles.spaced,
      ]}
      contentStyle={[styles.content, props.text && styles.textContent]}
      labelStyle={[styles.label, props.text && styles.textLabel]}
    >
      {props.children}
    </Button>
  );
};
export default ButtonCustom;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 8,
  },
  content: {
    width: "100%",
    height: 50,
  },
  label: {
    color: colorScheme.background,
    fontWeight: "bold",
    fontSize: 20,
  },

  // text style button
  text: {},
  textLabel: {
    color: colorScheme.accent,
  },
  textContent: {
    height: 45,
    width: "45%",
  },
  spaced: {
    marginVertical: "5%",
  },
});
