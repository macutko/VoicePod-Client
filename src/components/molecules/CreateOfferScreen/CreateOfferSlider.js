import {StyleSheet, View} from "react-native";
import TextInput from "react-native-paper/src/components/TextInput/TextInput";
import Slider from "@react-native-community/slider";
import {colorScheme} from "../../../constants/Colors";
import React, {useEffect, useRef, useState} from "react";

export const CreateOfferSlider = ({changeValue, defaultValue, label, minimumValue, maximumValue}) => {
    const [value, setValue] = useState(defaultValue)
    const input = useRef(null)

    useEffect(() => {
        if (isNaN(value)) setValue(minimumValue)
        if ((value > maximumValue) && (!input.current.isFocused())) {
            setValue(maximumValue)
        } else if ((value < minimumValue) && (!input.current.isFocused())) {
            setValue(minimumValue)
        }
        changeValue(value)
    }, [value])

    const confirm = (value) => {
        if (value > maximumValue) {
            setValue(maximumValue)
        } else if (value < minimumValue) {
            setValue(minimumValue)
        }
        changeValue(value)
    }

    return (
        <View style={styles.row}>
            <TextInput
                ref={input}
                style={styles.textInput}
                underlineColor={"transparent"}
                label={label}
                type={"flat"}
                keyboardType={"number-pad"}
                value={value.toString()}
                onChangeText={(text) =>
                    setValue(Math.round(text))
                }
                onEndEditing={() => confirm(value)}
            />
            <Slider
                style={styles.slider}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                value={!!value ? value : minimumValue}
                onValueChange={(e) => setValue(Math.round(e))}
                minimumTrackTintColor={colorScheme.background}

                thumbTintColor={colorScheme.secondary}
            />
        </View>
    )
}
export default CreateOfferSlider


const styles = StyleSheet.create({
    row: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginBottom: -15,
    },
    slider: {
        width: "72%",
        height: 30,
        marginTop: 18,
    },
    textInput: {
        width: "28%",
        textAlign: "center",
        backgroundColor: "transparent",
    },
});
