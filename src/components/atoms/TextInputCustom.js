import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const TextInputCustom = (props) => {
  return (
    <TextInput
      type={"flat"}
      style={styles.textInput}
      underlineColor={"transparent"}
      placeholder={props.placeholder}
      label={props.lable}
      value={props.value}
      onChangeText={props.onChangeText}
    />
  );
};

export default TextInputCustom;

const styles = StyleSheet.create({
  textInput: {
    width: "80%",
    textAlign: "center",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "black"
  },
});
