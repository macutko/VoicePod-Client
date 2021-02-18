import React, {useEffect, useRef, useState} from "react";
import {FileSystem} from "react-native-unimodules";
import {ActivityIndicator} from "react-native-paper";
import {colorScheme} from "../../constants/Colors";
import AudioPlayer from "./AudioPlayer";

const BitsAudioPlayer = ({fileName, soundBits}) => {
    const [path, setPath] = useState('')
    const _isMounted = useRef(false)

    useEffect(() => {
        let path = FileSystem.documentDirectory + `${fileName}.m4a`;

        FileSystem.writeAsStringAsync(path, soundBits, {encoding: FileSystem.EncodingType.Base64}).then((data) => {
            if (_isMounted) {
                setPath(path)
                console.log('Sound file created')
            }
        }).catch(e => (console.log(e)))


        return () => {
            _isMounted.current = false;
        }
    }, []);

    return (path === '' ? <ActivityIndicator animating={true} color={colorScheme.accent}/> :
            <AudioPlayer
                fileName={fileName}
                pathToSound={path}
            />
    )
}
export default BitsAudioPlayer