import * as React from "react";

import { StyleSheet, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { colorScheme } from "../components/constants/Colors";
import WelcomeScreenLogo from "./components/WelcomeScreenLogo";
import WelcomeScreenButton from "./components/WelcomeScreenButton";

export class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      signUp: false,
    };
  }

  toggleModal = (name) => {
    this.setState((prevState) => ({
      [name]: !prevState[name],
    }));
  };

  render = () => {
    return (
      <View style={styles.container}>
        <WelcomeScreenLogo style={styles.logo} />

        <View style={styles.buttonContainer}>
          <WelcomeScreenButton
            type="login"
            onPress={() => {
              this.toggleModal("login");
            }}
          >
            log in
          </WelcomeScreenButton>

          <WelcomeScreenButton
            type="signup"
            onPress={() => this.toggleModal("signUp")}
          >
            sign up
          </WelcomeScreenButton>

          {/* <View style={styles.socialButtons}>
            <WelcomeScreenButton
              type="social"
              onPress={() => {
                console.log("Facebook button pressed");
              }}
            >
              <Ionicons name={"logo-facebook"} style={styles.icon} />
            </WelcomeScreenButton>

            <WelcomeScreenButton
              type="social"
              onPress={() => {
                console.log("Google button pressed");
              }}
            >
              <Ionicons name={"logo-google"} style={styles.icon} />
            </WelcomeScreenButton>
          </View> */}
        </View>

        <LoginForm
          visible={this.state.login}
          close={() => this.toggleModal("login")}
          navigation={this.props.navigation}
        />

        <SignUpForm
          navigation={this.props.navigation}
          visible={this.state.signUp}
          close={() => this.toggleModal("signUp")}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  // TO DO: make it more responsive, change the font
  container: {
    backgroundColor: colorScheme.background,
    width: "100%",
    height: "100%",
    position: "relative",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  buttonContainer: {
    width: "80%",
    height: "30%",
    justifyContent: "space-between"
  },    
  icon: {
    fontSize: 50,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  logo: {
    paddingBottom: 50,
    backgroundColor: "red"
  },
});
