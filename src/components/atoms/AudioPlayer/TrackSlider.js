import Slider from "@react-native-community/slider";
import {colorScheme} from "../../../constants/Colors";
import React, {useEffect, useRef, useState} from "react";
import {StyleSheet} from "react-native";

const TrackSlider = ({width, setPosition, position, sound}) => {
    const _isMounted = useRef(true);
    const [maxVal, setMaxVal] = useState(0)


    useEffect(() => {
        if (_isMounted) {
            console.log('update just once')
            sound.getStatusAsync().then(status => {
                setMaxVal(status.durationMillis)
            }).catch(e => console.log(e))
        }
        return () => {
            _isMounted.current = false;
        }
    }, []);


    return (
        <Slider
            style={[styles.slider, {width: width}]}
            minimumValue={0}
            maximumValue={maxVal}
            value={position}
            onValueChange={(e) => setPosition(e)}
            minimumTrackTintColor={colorScheme.background}
            thumbTintColor={colorScheme.secondary}
            maximumTrackTintColor={colorScheme.white}
        />
    )
}
export default TrackSlider

const styles = StyleSheet.create({
    slider: {
        height: 50,
        width: "50%",
        flexGrow: 1,
    },

});
