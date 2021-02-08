import {Button, Dialog, Portal} from "react-native-paper";
import {ScrollView, StyleSheet} from "react-native";
import {TermsAndConditions} from "./TermsAndConditions";
import React from "react";
import {colorScheme} from "../../../constants/Colors";

const LicenseDialog = ({toggleLicenseDialog}) => {
    return (
        <Portal>
            <Dialog
                visible={this.state.licenseDialogVisible}
                onDismiss={() => toggleLicenseDialog()}
                style={styles.licenseDialog}
            >
                <Dialog.ScrollArea>
                    <ScrollView
                        contentContainerStyle={
                            styles.licenseDialogScrollViewContainer
                        }
                    >
                        <TermsAndConditions/>
                        <Button onPress={() => toggleLicenseDialog()}>
                            OK
                        </Button>
                    </ScrollView>
                </Dialog.ScrollArea>
            </Dialog>
        </Portal>
    )
}
export default LicenseDialog


const styles = StyleSheet.create({
    licenseDialog: {},
    licenseContainer: {
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
    },
    licenseAnchor: {
        color: colorScheme.secondary,
    },
    licenseCheckbox: {
        marginBottom: 10,
    },
    licenseDialogScrollViewContainer: {
        padding: 10,
    },
});
