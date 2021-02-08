import {StyleSheet, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {colorScheme} from "../../../constants/Colors";
import {Audio} from 'expo-av';
import PlayButton from "./PlayButton";
import ActivityIndicator from "react-native-paper/src/components/ActivityIndicator";
import {FileSystem} from 'react-native-unimodules';
import TrackSlider from "./TrackSlider";
import PauseButton from "./PauseButton";

const AudioPlayer = ({fileName, soundBits, style, pathToSound}, props) => {
    const [sound, setSound] = useState(null)
    const [playing, setPlaying] = useState(null)
    const _isMounted = useRef(true);
    const [loading, setLoading] = useState(true)
    const [position, setPosition] = useState(0)

    useEffect(() => {
        if (!playing && sound && _isMounted) {
            sound.setPositionAsync(position).then(r => console.log(r)).catch(e => console.log(e))
        }
    }, [position])

    useEffect(() => {
        //LOAD THE SOUND
        if (loading) {
            if (soundBits) {
                let path = FileSystem.documentDirectory + `${fileName}.wav`;
                FileSystem.writeAsStringAsync(path, soundBits, {encoding: FileSystem.EncodingType.Base64}).then((data) => {
                    Audio.Sound.createAsync(require('./600b0d2a87eb3b48503eaf21_600aee7e4b8080307c5d150c.wav')).then(r => {
                        if (_isMounted) {
                            setSound(r.sound)
                            setLoading(false)
                        }
                    }).catch(e => console.log(e))
                }).catch(e => (console.log(e)))

            } else if (pathToSound) {
                Audio.Sound.createAsync(pathToSound).then(r => {
                    if (_isMounted) {
                        setSound(r.sound)
                        setLoading(false)
                    }
                }).catch(e => console.log(e))
            }

        }
    }, [loading]);


    useEffect(() => {
        //unmount
        return () => {
            _isMounted.current = false;
        }
    }, []);

    useEffect(() => {
        // Handle play changes
        if (sound) {
            sound.setOnPlaybackStatusUpdate((status) => {
                if (_isMounted) {
                    if (status.isPlaying) setPosition(status.positionMillis)
                    setPlaying(status.isPlaying)
                }

            })
        }
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View style={style}>
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    {loading ? <ActivityIndicator animating={true} color={colorScheme.accent}/> :
                        <>
                            {playing ? <PauseButton sound={sound}/> : <PlayButton sound={sound}/>}
                            <TrackSlider sound={sound} width={props.width} position={position}
                                         setPosition={setPosition}/>
                        </>}
                </View>
            </View>
        </View>
    )
}

export default AudioPlayer

const styles = StyleSheet.create({
    mainContainer: {
        alignContent: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        backgroundColor: colorScheme.black,
        borderRadius: 15,
    },
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
});
