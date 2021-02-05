import React from "react";
import {Image, StyleSheet} from "react-native";
import Title from "react-native-paper/src/components/Typography/Title";
import OfferTemplate from "../../components/organisms/CreateOfferScreen/OfferTemplate";

export const ProblemCreateOfferScreen = (props) => {
    const submit = (voiceClip) => {
        props.navigation.navigate("SetBudgetCreateOfferScreen", {
            ...props.route.params,
            intro: props.route.params.intro,
            problem: voiceClip,
        });
    };


    return (
        <OfferTemplate
            {...props}
            style={styles.container}
            current={"ProblemCreateOfferScreen"}
            submit={(voiceClip) => submit(voiceClip)}
            description={
                "Try to be as factual and as specific as possible."
            }
            title={"Problem"}
        >
            <>
                <Image
                    style={styles.image}
                    source={require("../../assets/images/problem.png")}
                />
                <Title style={styles.title}>What is your problem?</Title>
            </>
        </OfferTemplate>
    );

}
export default ProblemCreateOfferScreen;

const styles = StyleSheet.create({
    image: {
        resizeMode: "contain",
        flex: 0.7,
    },
    title: {
        fontSize: 30,
    },
    description: {
        fontSize: 13,
    },
});
