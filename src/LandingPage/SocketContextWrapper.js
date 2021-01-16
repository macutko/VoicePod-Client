import * as React from "react";
import * as io from "socket.io-client";
import GlobalContext from "../GlobalState";
import config from "../components/constants/Config";

const SocketContext = React.createContext();

export {SocketContext};


export default class SocketWrapper extends React.Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            socket: undefined
        }
    }

    componentDidMount() {
        let socket = io.connect(config.baseURL, {'forceNew': false});
        socket.on('connect', () => {
            socket.emit('authenticate', {token: this.context.globalState.token})
        })
        socket.on("authenticated", () => {
            this.setState({
                socket: socket
            })
        })
        socket.on("disconnect", (data) => {
            console.log(`I have been kicked ${data}`)
        });

    }

    render() {
        return (
            <SocketContext.Provider value={{socket: this.state.socket}}>
                {this.state.socket ? this.props.children : null}
            </SocketContext.Provider>

        )
    }

}
