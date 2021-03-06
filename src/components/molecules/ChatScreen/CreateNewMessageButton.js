import {colorScheme} from "../../../constants/Colors"
import React, {useContext, useEffect, useRef, useState} from "react"
import RecordButton from "../../atoms/RecordButton"
import Ionicons from "react-native-vector-icons/Ionicons"
import {SocketContext} from "../../atoms/SocketContext"
import {getMinutesBalanceAPI} from "../../../api/chat/getMinutesBalanceAPI"
import {Title} from "react-native-paper"

const CreateNewMessageButton = ({chatId, returnNewMessage}) => {
	const [usedSeconds, setUsedSeconds] = useState(0)
	const [secondsLeft, setSecondsLeft] = useState(0)
	const context = useContext(SocketContext)
	const _isMounted = useRef(true)

	useEffect(() => {
		getMinutesBalanceAPI(context.socket, {chatId: chatId}).then(res => {
			let left = res.minutes * 60 + res.seconds
			if (_isMounted) setSecondsLeft(left - usedSeconds)
		}).catch(e => console.log(e))


		return () => {
			_isMounted.current = false
		}
	}, [])

	return (
		<>

			<RecordButton disabled={secondsLeft <= 1} returnData={(r) => returnNewMessage(r.voiceClip)}
				returnSeconds={setUsedSeconds} fileName={`${chatId}_new.wav`}
				limit={secondsLeft}>

				<Ionicons size={30} color={colorScheme.accent} name={"mic"}/>


			</RecordButton>
			<Title>Seconds left {secondsLeft - usedSeconds === -1 ? 0 : secondsLeft - usedSeconds}</Title>
		</>
	)
}
export default CreateNewMessageButton
