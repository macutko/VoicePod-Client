import * as React from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import ButtonCustom from "../../components/atoms/ButtomCustom";
import TitleCustom from "../../components/atoms/TitleCustom";
import SignUpForm from "../../components/organisms/AuthScreen/SignUpForm";
import { colorScheme } from "../../constants/Colors";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isKeyboadVisible: false,
    };
  }

  // TODO: outsource keyboard into it's own wrapping component
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      isKeyboadVisible: true,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      isKeyboadVisible: false,
    });
  };

  render = () => {
    return (
      <View
        style={[
          styles.container,
          this.state.isKeyboadVisible && styles.withKeyboard,
        ]}
      >
        {!this.state.isKeyboadVisible && <TitleCustom>Sign Up</TitleCustom>}
        <SignUpForm />
        <View style={styles.signupLink}>
          <TitleCustom secondary>Have an Account?</TitleCustom>
          <ButtonCustom onPress={() => this.props.navigation.goBack()} text>
            Login
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
    width: "100%",
    justifyContent: "space-between",
  },
  withKeyboard: {
    justifyContent: "flex-start",
  },
});
