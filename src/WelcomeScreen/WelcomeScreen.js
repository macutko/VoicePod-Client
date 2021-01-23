import * as React from "react";
import { StyleSheet, View } from "react-native";
import { colorScheme } from "../components/constants/Colors";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import WelcomeScreenButton from "./components/WelcomeScreenButton";
import WelcomeScreenLogo from "./components/WelcomeScreenLogo";
import Ionicons from "react-native-vector-icons/Ionicons";

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
            mode="outlined"
            onPress={() => {
              this.toggleModal("login");
            }}
          >
            log in
          </WelcomeScreenButton>

          <WelcomeScreenButton
            mode="contained"
            onPress={() => this.toggleModal("signUp")}
          >
            sign up
          </WelcomeScreenButton>

          <View style={styles.iconButtons}>
            <WelcomeScreenButton
              mode="outlined"
              onPress={() => {
                console.log("Facebook button pressed");
              }}
              small
            >
              <Ionicons name={"logo-facebook"} style={styles.icon} />
            </WelcomeScreenButton>

            <WelcomeScreenButton
              mode="outlined"
              onPress={() => {
                console.log("Google button pressed");
              }}
              small
            >
              <Ionicons name={"logo-google"} style={styles.icon} />
            </WelcomeScreenButton>
          </View>
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
    position: "absolute",
  },
  buttonContainer: {
    top: "25%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  icon: {
    fontSize: 50,
  },
  iconButtons: {
    flexDirection: "row",
    height: "20%",
    justifyContent: "space-between",
    width: 240,
  },
  logo: {
    top: "90%",
  },
});
