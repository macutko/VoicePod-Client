import * as React from "react";
import * as io from "socket.io-client";
import GlobalContext from "../GlobalState";
import config from "../constants/Config";

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
        let socket = io.connect(config.baseURL, {'forceNew': true});
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
    componentWillUnmount() {
        this.state.socket.emit('terminate')
    }

    render() {
        return (
            <SocketContext.Provider value={{socket: this.state.socket}}>
                {this.state.socket ? this.props.children : null}
            </SocketContext.Provider>

        )
    }

}


// this.socket.on("connect", (socket) => {
//     this.socket.emit("authenticate", {token: this.context.globalState.token})
//         .on("authenticated", () => {
//             this.setState(
//                 (prevState) => ({
//                     currentUserObject: {
//                         ...prevState.currentUserObject,
//                         socketID: this.socket.sessionId,
//                     },
//                 }),
//                 () => {
//                     this.updateUserPosition();
//                 }
//             );
//         })
//         .on("position_update", (data) => {
//             this.add_user(data);
//         })
//         .on("user_disconnected", (data) => {
//             this.remove_user(data.userID);
//         })
//         .on("initial_location_status", (data) => {
//             for (let key in data.locations) {
//                 // TODO: make sure that the current user doesnt add itself
//                 if (
//                     data.locations[key].socketID !==
//                     this.state.currentUserObject.socketID
//                 ) {
//                     this.add_user(data.locations[key]);
//                 }
//             }
//         })
//         .on("disconnect", (data) => {
//             removeFromMemory(["token", "username"]).then(() => {
//                 this.props.navigation.navigate("WelcomeScreen");
//             });
//         });
// });