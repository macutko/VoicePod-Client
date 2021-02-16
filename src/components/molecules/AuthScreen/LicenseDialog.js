import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import ButtonCustom from "../../atoms/ButtomCustom";
import { TermsAndConditions } from "./TermsAndConditions";

const LicenseDialog = (props) => {
  console.log(props);
  return (
    <Portal>
      <Dialog
        visible={props.visible}
        onDismiss={() => props.toggleLicenseDialog()}
        style={styles.licenseDialog}
      >
        <Dialog.ScrollArea>
          <ScrollView
            contentContainerStyle={styles.licenseDialogScrollViewContainer}
          >
            <TermsAndConditions />
            <ButtonCustom
              onPress={() => props.toggleLicenseDialog()}
              spaced
              text
            >
              Close
            </ButtonCustom>
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};
export default LicenseDialog;

const styles = StyleSheet.create({
  licenseDialogScrollViewContainer: {
    padding: 10,
  },
});
