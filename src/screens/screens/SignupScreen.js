import * as React from "react";
import { StyleSheet, View } from "react-native";
import LoginForm from "../../components/organisms/AuthScreen/LoginForm";
import SignUpForm from "../../components/organisms/AuthScreen/SignUpForm";
import { colorScheme } from "../../constants/Colors";


export default class LoginScreen extends React.Component {
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
        console.log("Login");
        return (
            <View style={styles.container}>

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
});