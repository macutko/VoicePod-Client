import React from "react";
import GlobalContext from "./components/atoms/GlobalState";
import {NavigationContainer} from "@react-navigation/native";
import {getFromMemory} from "./utilities/StorageUtils";
import {MainNav} from "./navigation/MainNav";
import {LandingNav} from "./navigation/LandingNav";
import getCurrentUserAPI from "./api/user/getCurrentUserAPI";

export const navigationRef = React.createRef();

export default class Main extends React.Component {
    //TODO: refactor
    //TODO: add splash screen

    constructor(props) {
        super(props);
        this.state = {
            globalState: {},
        };
    }

    updateGlobalState = (user, token, loggedIn = false, callback = null) => {
        this.setState(
            {
                globalState: {
                    loggedIn: loggedIn,
                    user: user,
                    token: token,
                },
            },
            () => (callback !== null ? callback() : null)
        );
    };

    refreshState = (token, callback = null) => {
        getCurrentUserAPI(token, callback).then(r => {
            this.updateGlobalState(r, token, true, () => {
                callback !== null ? callback() : null;
            })
        }).catch(e => console.log(e))
    };

    componentDidMount() {
        getFromMemory("token").then((memToken) => {
            let token;
            if (memToken != null) token = memToken;
            else if (this.state.globalState.token != null)
                token = this.state.globalState.token;

            if (token != null) {
                this.refreshState(token);
            }
        });
    }

    render() {
        return (
            <GlobalContext.Provider
                value={{
                    globalState: this.state.globalState,
                    updateGlobalState: this.updateGlobalState,
                    refreshState: this.refreshState,
                }}
            >
                <NavigationContainer ref={navigationRef}>
                    {this.state.globalState.loggedIn ? <MainNav/> : <LandingNav/>}
                </NavigationContainer>
            </GlobalContext.Provider>
        );
    }
}
