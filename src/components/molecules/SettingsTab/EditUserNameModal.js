import {Button, Modal, Portal, TextInput} from "react-native-paper";
import React, {useContext, useState} from "react";
import {StyleSheet} from "react-native";
import GlobalContext from "../../atoms/GlobalState";

const EditUserNameModal = ({visible, close, submit}) => {
    const context = useContext(GlobalContext);
    const [firstName, setFirstName] = useState(context.globalState.user.firstName);
    const [lastName, setLastName] = useState(context.globalState.user.lastName);

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={() => close()}
                animationType="fade"
                contentContainerStyle={styles.modalStyle}
            >
                <TextInput
                    label="First Name"
                    mode='outlined'
                    textContentType={"givenName"}
                    onChangeText={(text) =>
                        setFirstName(text)
                    }
                    autoCompleteType={"name"}
                    style={styles.inputStyle}
                    value={firstName}
                />
                <TextInput
                    label="Last Name"
                    mode='outlined'
                    textContentType={"familyName"}
                    onChangeText={(text) =>
                        setLastName(text)
                    }
                    autoCompleteType={"name"}
                    style={styles.inputStyle}
                    value={lastName}
                />
                <Button mode="outlined" onPress={() => submit({
                    firstName: firstName,
                    lastName: lastName
                })} style={styles.buttonStyle}>
                    Update
                </Button>

            </Modal>
        </Portal>

    );
}

export default EditUserNameModal;


const styles = StyleSheet.create({
    modalStyle: {backgroundColor: 'white', padding: 20, marginHorizontal: "5%"},
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
    },
    inputStyle: {
        marginBottom: "5%",
    }
});
