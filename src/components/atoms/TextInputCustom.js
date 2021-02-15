import React from "react";
import { StyleSheet } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { colorScheme } from "../../constants/Colors";

const TextInputCustom = (props) => {
  return (
    <>
      <TextInput
        label={props.label}
        mode="flat"
        secureTextEntry={props.secureTextEntry}
        textContentType={props.textContentType}
        autoCompleteType={props.autoCompleteType}
        password={props.password}
        error={props.error}
        onChangeText={props.onChangeText}
        style={styles.inputStyle}
        theme={{
          colors: {
            placeholder: colorScheme.accent,
          },
        }}
        underlineColor={colorScheme.white_shaded}
      />
      <HelperText type="error" visible={props.error}>
        {props.error}
      </HelperText>
    </>
  );
};
export default TextInputCustom;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "transparent",
    width: "100%",
    // backgroundColor: "red",
    height: 50,
    marginVertical: -3,
  },
});
