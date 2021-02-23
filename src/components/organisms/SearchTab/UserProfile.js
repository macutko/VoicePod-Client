import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Text from "react-native-paper/src/components/Typography/Text";
import { getCheckDefaultPaymentMethodAPI } from "../../../api/getCheckDefaultPaymentMethodAPI";
import { colorScheme } from "../../../constants/Colors";
import ButtonCustom from "../../atoms/ButtomCustom";
import Tags from "../../atoms/Tags";
import UserProfileTemplate from "../../molecules/UserProfileTemplate";
import StartFreeChat from "../../molecules/SearchTab/StartFreeChat";

const UserProfile = (props) => {
    const _isMounted = useRef(true);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        return () => {
            // ComponentWillUnmount in Class Component
            _isMounted.current = false;
        };
    }, []);

    const navigateToOfferCreation = () => {
        getCheckDefaultPaymentMethodAPI(props.socket)
            .then((r) => {
                if (r) {
                    props.mainNav.navigate("IntroCreateOfferScreen", {
                        ...props.route.params,
                    });
                } else {
                    if (_isMounted) setShowDialog(!showDialog);
                }
            })
            .catch((e) => console.log(e));
    };

    const tags = ["HTML", "Design", "react", "figma"];

    return (
        <UserProfileTemplate
            firstName={props.route.params.firstName}
            lastName={props.route.params.lastName}
            rating={4}
            reviews={48}
            cases={12}
            budget={50}
        >
            <Tags tagsList={tags} />
            <View style={styles.descriptionContainer}>
                {/* <Text>{props.route.params.description}</Text> */}
                <Text style={styles.description}>
                    Premium designed icons for use in web, iOS, Android, and
                    desktop apps. Support for SVG and web font. Completely open
                    source, MIT licensed and built by Ionic.
                </Text>
                <Text style={styles.usernameHandle}>
                    @{props.route.params.username}
                </Text>
            </View>
            <View style={styles.buttons}>
                <ButtonCustom half onPress={() => navigateToOfferCreation()}>
                    Send Offer
                </ButtonCustom>
                <StartFreeChat
                    mainNav={props.mainNav}
                    username={props.route.params.username}
                />
            </View>
            <Text style={styles.instructions}>
                Hold the microphone to start chat.
            </Text>

            {/* 
      <ReviewsList username={props.route.params.username} />

      <AddPaymentWarning
        toggleDialog={_isMounted ? () => setShowDialog(!showDialog) : null}
        navigation={props.navigation}
        showDialog={showDialog}
      /> */}
        </UserProfileTemplate>
    );
};
export default UserProfile;

const styles = StyleSheet.create({
    descriptionContainer: {
        height: 95,
        fontSize: 14,
        paddingVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    description: {
        textAlign: "center",
    },
    usernameHandle: {
        fontSize: 15,
        color: colorScheme.placeholder,
        alignSelf: "flex-end",
        fontStyle: "italic",
    },

    buttons: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        // marginVertical: 10,
    },
    instructions: {
        color: colorScheme.placeholder,
        paddingBottom: 4,
    },
});
