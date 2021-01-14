import React from "react"
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Input} from "react-native-elements";
import {colorScheme} from "../../../constants/Colors";
import {axiosInstance} from "../../../helpers/connectionInstances";
import GlobalContext from "../../../GlobalState";

export default class StartChatForm extends React.Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            message: "Hi!"
        }
    }

    onChangeText = (text, name) => {
        this.setState({
            [name]: text,
        });
    };


    submitForm = () => {
        axiosInstance
            .post("/chat/create", {
                username: this.state.username,
                message: this.state.message,
            }, {
                headers: {
                    Authorization: `Bearer ${this.context.globalState.token}`
                },
            })
            .then((response) => {
                console.log(`Response form create chat ${response.data}`)
                this.props.toggleModal()
            })
            .catch((error) => {
                console.log(`Error in StartChat ${error}`)
            });
    };


    render() {
        return (
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Input
                    containerStyle={styles.inputOutterContainer}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.textInputStyle}
                    placeholder="Username"
                    onChangeText={(text) => this.onChangeText(text, "username")}
                    autoCompleteType={"username"}
                />
                <Input
                    containerStyle={styles.inputOutterContainer}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.textInputStyle}
                    placeholder="Say Hi!"
                    onChangeText={(text) => this.onChangeText(text, "message")}
                />

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.submitForm()}
                >
                    <Text style={styles.buttonText}>Start Chat</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    inputOutterContainer: {
        marginBottom: 10,
        marginTop: 10,
    },
    inputContainer: {
        width: "100%",
    },
    textInputStyle: {
        fontSize: 25,
        fontFamily: "DimboRegular",
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "75%",
        marginBottom: "7%",
        marginTop: "7%",
        height: 70,
        borderRadius: 50,

        borderWidth: 5,
    },
    buttonText: {
        fontFamily: "DimboRegular",
        fontSize: 45,
    },
    errorMessage: {
        color: colorScheme.error,
    },
});


