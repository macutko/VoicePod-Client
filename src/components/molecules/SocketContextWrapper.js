import * as React from "react"
import * as io from "socket.io-client"
import GlobalContext from "../atoms/GlobalState"
import config from "../../constants/Config"
import {SocketContext} from "../atoms/SocketContext"

let socket

export default class SocketWrapper extends React.Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props)
    }

    logOut = () => {
        socket.disconnect()
    }

    componentWillUnmount() {
        this.logOut()
    }

    componentDidMount() {
        socket = io.connect(config.baseURL, {forceNew: true})
        socket.on("connect", () => {
            socket.emit("authenticate", {token: this.context.globalState.token})
        })
        socket.on("authenticated", () => {
            this.setState({
                socket: socket,
            })
        })
        socket.on("disconnect", (data) => {
            console.log(`I have been kicked ${data}`)
        })

    }

    render() {
        return (
            <SocketContext.Provider value={{socket: socket}}>
                {socket ? this.props.children : null}
            </SocketContext.Provider>

        )
    }

}
