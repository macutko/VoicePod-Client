import * as React from "react";
import {StyleSheet, View} from "react-native";

import GlobalContext from "../../atoms/GlobalState";
import authenticateUserAPI from "../../../api/user/authenticateUserAPI";
import TextInputCustom from "../../atoms/TextInputCustom";
import ButtonCustom from "../../atoms/ButtomCustom";

export default class LoginForm extends React.Component {
    static contextType = GlobalContext;

    constructor(props, context) {
        super(props, context);
        this._isMounted = false;
        this.state = {
            isUsernameWrong: false,
            isPasswordWrong: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onChangeText = (text, name) => {
        this.setState({
            [name]: text,
            passwordError: undefined,
        });
    };

    submitForm = () => {
        authenticateUserAPI(this.state.username, this.state.password)
            .then(([user, token]) => {
                this.context.updateGlobalState(user, token, true);
            })
            .catch((e) => {
                if (this._isMounted) {
                    this.setState({...e});
                }
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInputCustom
                    label="Username"
                    autoCompleteType={"username"}
                    textContentType={"username"}
                    style={styles.inputStyle}
                    error={this.state.isUsernameWrong}
                    errorMessage={this.state.passwordError}
                    onChangeText={(text) => this.onChangeText(text, "username")}
                />

                <TextInputCustom
                    label="Password"
                    secureTextEntry={true}
                    textContentType={"password"}
                    autoCompleteType={"password"}
                    password={true}
                    error={this.state.isPasswordWrong}
                    errorMessage={this.state.passwordError}
                    onChangeText={(text) => this.onChangeText(text, "password")}
                />

                <ButtonCustom onPress={() => this.submitForm()} spaced>
                    Login
                </ButtonCustom>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignItems: "flex-start",
        alignSelf: "flex-start",
    },
});
