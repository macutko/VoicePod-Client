import WelcomeScreenLogo from "../../molecules/WelcomeScreen/WelcomeScreenLogo";
import {StyleSheet, View} from "react-native";
import WelcomeScreenButton from "../../molecules/WelcomeScreen/WelcomeScreenButton";
import * as React from "react";

const WelcomeScreenHeader = ({toggleModal}) => {

    return (
        <>
            <WelcomeScreenLogo style={styles.logo}/>

            <View style={styles.buttonContainer}>
                <WelcomeScreenButton
                    type="login"
                    onPress={() => {
                        toggleModal("login");
                    }}
                >
                    log in
                </WelcomeScreenButton>

                <WelcomeScreenButton
                    type="signup"
                    onPress={() => toggleModal("signUp")}
                >
                    sign up
                </WelcomeScreenButton>


            </View>
        </>
    )
}

export default WelcomeScreenHeader;

const styles = StyleSheet.create({
    // TO DO: make it more responsive, change the font

    buttonContainer: {
        width: "80%",
        height: "30%",
        justifyContent: "space-between"
    },

    logo: {
        paddingBottom: 50,
        backgroundColor: "red"
    },
});