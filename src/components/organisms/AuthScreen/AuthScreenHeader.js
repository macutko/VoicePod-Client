import AuthScreenLogo from "../../molecules/AuthScreen/AuthScreenLogo";
import {StyleSheet, View} from "react-native";
import AuthScreenButton from "../../molecules/AuthScreen/AuthScreenButton";
import * as React from "react";

const AuthScreenHeader = ({toggleModal}) => {

    return (
        <>
            <AuthScreenLogo style={styles.logo}/>

            <View style={styles.buttonContainer}>
                <AuthScreenButton
                    type="login"
                    onPress={() => {
                        toggleModal("login");
                    }}
                >
                    log in
                </AuthScreenButton>

                <AuthScreenButton
                    type="signup"
                    onPress={() => toggleModal("signUp")}
                >
                    sign up
                </AuthScreenButton>


            </View>
        </>
    )
}

export default AuthScreenHeader;

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
