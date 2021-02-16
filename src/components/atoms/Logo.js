import React from "react";
import { Image, StyleSheet, View } from "react-native";

const Logo = () => {
  return (
      <Image
        style={styles.logo}
        source={require("../../assets/images/logo.png")}
      />
  );
};
export default Logo;

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    flex: 0.6,
  },
});
