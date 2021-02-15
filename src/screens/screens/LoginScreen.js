import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import Logo from "../../components/atoms/Logo";
import TitleCustom from "../../components/atoms/TitleCustom";
import LoginForm from "../../components/organisms/AuthScreen/LoginForm";
import SignUpForm from "../../components/organisms/AuthScreen/SignUpForm";
import { colorScheme } from "../../constants/Colors";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Logo />
        <TitleCustom>Login</TitleCustom>
        <Title>Login</Title>
        <LoginForm navigation={this.props.navigation} />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  // TO DO: make it more responsive, change the font
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
