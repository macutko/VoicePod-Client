import Dialog from "react-native-paper/src/components/Dialog/Dialog";
import {Button, Paragraph} from "react-native-paper";
import Portal from "react-native-paper/src/components/Portal/Portal";
import React from "react";

export const AddPaymentWarning = ({showDialog, toggleDialog, navigation}) => {
    return (
        <Portal>
            <Dialog visible={showDialog} onDismiss={() => toggleDialog()}>
                <Dialog.Title>No payment method</Dialog.Title>

                <Dialog.Content>
                    <Paragraph>We are sorry, but first setup a default payment method in settings</Paragraph>
                </Dialog.Content>

                <Dialog.Actions>
                    <Button onPress={() => {
                        toggleDialog()
                        navigation.navigate('SettingsTab', {
                            screen: 'Payments'
                        })
                    }}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>)
}
