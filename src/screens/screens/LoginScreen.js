import * as React from "react";
import { StyleSheet, View } from "react-native";
import ButtonCustom from "../../components/atoms/ButtomCustom";
import Logo from "../../components/atoms/Logo";
import TitleCustom from "../../components/atoms/TitleCustom";
import TitleWithDescription from "../../components/atoms/TitleWithDescription";
import LoginForm from "../../components/organisms/AuthScreen/LoginForm";
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
        <TitleWithDescription description="Welcome back!">
          Login
        </TitleWithDescription>
        <LoginForm />
        <View style={styles.signupLink}>
          <TitleCustom secondary>New to VoicePod?</TitleCustom>
          <ButtonCustom
            onPress={() => this.props.navigation.push("SignupScreen")}
            text
          >
            SignUp
          </ButtonCustom>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.background,
    width: "100%",
    height: "100%",
    paddingHorizontal: "10%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  signupLink: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
