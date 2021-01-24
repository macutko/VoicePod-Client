import * as React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { colorScheme } from "../../components/constants/Colors";

const WelcomeScreenButton = (props) => {
  return (
    <Button
      mode={props.mode}
      onPress={props.onPress}
      style={[
        styles.buttonStyle,
        props.mode == "outlined" && styles.buttonStyleOutlined,
        props.small && styles.small
      ]}
      labelStyle={[
        styles.labelStyle,
        props.mode == "outlined" && styles.labelStyleOutlined,
      ]}
      contentStyle={styles.contentStyle}
    >
      {props.children}
    </Button>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    height: "100%",
    width: "100%",
  },
  labelStyle: {
    fontSize: 20,
  },
  buttonStyle: {
    justifyContent: "center",
    width: 240,
    borderRadius: 6,
    marginBottom: "5%",
    height: 80,
    fontSize: 3,
  },
  labelStyleOutlined: {
    color: colorScheme.black,
  },
  buttonStyleOutlined: {
    borderWidth: 2,
    borderColor: colorScheme.black,
  },
  small: {
    width: 110,
  }
});

export default WelcomeScreenButton;
