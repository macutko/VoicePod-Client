import {Button, Dialog, Paragraph, Portal} from "react-native-paper";
import React, {useContext} from "react";
import deleteUserAPI from "../../../api/user/deleteUserAPI";
import GlobalContext from "../../atoms/GlobalState";

const ConfirmDelete = ({deleteUserDialog, toggleDialog, logOut}) => {
    const context = useContext(GlobalContext);

    const confirmDelete = async () => {
        deleteUserAPI(context.globalState.token).then(logOut()).catch(logOut())
    }

    return (
        <Portal>
            <Dialog visible={deleteUserDialog} onDismiss={toggleDialog}>
                <Dialog.Title>Delete User</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Are you sure you want to delete your account? Your data will be permanently and
                        inadvertently erased. We will still collect any outstanding payments or open chats.
                        However, you might not get paid if you have open chats. Please close these chats
                        first.</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => confirmDelete()}>Yes!</Button>
                    <Button onPress={toggleDialog}>No!</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

export default ConfirmDelete;