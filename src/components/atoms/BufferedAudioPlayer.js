import React, {useContext, useEffect, useRef, useState} from "react"
import {SocketContext} from "./SocketContext"
import {getSoundByIdAPI} from "../../api/sound/getSoundByIdAPI"
import {colorScheme} from "../../constants/Colors"
import {ActivityIndicator} from "react-native-paper"
import BitsAudioPlayer from "./BitsAudioPlayer"

const BufferedAudioPlayer = ({fileName, soundId}) => {
	// TODO make truly buffered
	const [soundObject, setSoundObject] = useState(false)
	const [loading, setLoading] = useState(true)
	const _isMounted = useRef(false)
	const context = useContext(SocketContext)

	useEffect(() => {
		getSoundByIdAPI(context.socket, {id: soundId}).then(res => {
			if (_isMounted) {
				setSoundObject(res)
				setLoading(false)
			}
		}).catch(e => {
			if (_isMounted) {
				setLoading(false)
			}
		})
		return () => {
			_isMounted.current = false
		}
	}, [])


	return (loading ? <ActivityIndicator animating={true} color={colorScheme.accent}/> :
		<BitsAudioPlayer
			fileName={fileName}
			soundBits={soundObject.soundBits}/>

	)
}

export default BufferedAudioPlayer
