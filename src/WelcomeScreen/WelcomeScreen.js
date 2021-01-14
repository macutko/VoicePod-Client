import {StyleSheet, View} from "react-native";
import * as React from "react";
import LoginForm from "./LoginForm";
import {SignUpForm} from "./SignUpForm";
import {Button} from 'react-native-paper';
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

            <View style={styles.container}>
                <Button mode="outlined" onPress={() => this.toggleModal("login")} style={styles.buttonStyle}>
                    Log In
                </Button>
                <Button mode="contained" onPress={() => this.toggleModal("signUp")} style={styles.buttonStyle}>
                    Sign Up
                </Button>

                <LoginForm visible={this.state.login} close={() => this.toggleModal("login")}
                           navigation={this.props.navigation}/>

                <SignUpForm navigation={this.props.navigation} visible={this.state.signUp}
                            close={() => this.toggleModal("signUp")}/>

            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorScheme.background,
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
        width: "75%",
        marginBottom: "5%",
        height: "10%",
    }
});
