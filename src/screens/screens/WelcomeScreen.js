import * as React from "react";

import {StyleSheet, View} from "react-native";
import LoginForm from "../../components/organisms/WelcomeScreen/LoginForm";
import SignUpForm from "../../components/organisms/WelcomeScreen/SignUpForm";
import {colorScheme} from "../../constants/Colors";
import WelcomeScreenHeader from "../../components/organisms/WelcomeScreen/WelcomeScreenHeader";

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

                <WelcomeScreenHeader toggleModal={this.toggleModal}/>


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
