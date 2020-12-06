import {StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import * as React from "react";
import {FormOverlay} from "./FormOverlay";
import LoginForm from "./LoginForm";
import {SignUpForm} from "./SignUpForm";
import {colorScheme} from "../constants/Colors";

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

            <View style={styles.gradient}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => this.toggleModal("login")}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => this.toggleModal("signUp")}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <FormOverlay
                    visible={this.state.login}
                    close={() => this.toggleModal("login")}
                >
                    <LoginForm navigation={this.props.navigation}/>
                </FormOverlay>

                <FormOverlay
                    visible={this.state.signUp}
                    close={() => this.toggleModal("signUp")}
                >
                    <SignUpForm navigation={this.props.navigation}/>
                </FormOverlay>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "40%"
    },
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
        width: "75%",
        marginBottom: "7%",
        height: "10%",
        borderRadius: 50,
        borderColor: colorScheme.welcomeScreenBackgroundButton,
        borderWidth: 5,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
    },
    buttonText: {
        color: colorScheme.welcomeScreenText,
        fontFamily: "SuperMario256",
        fontSize: 32,
    },
});
