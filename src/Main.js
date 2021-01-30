import React from 'react';
import GlobalContext from "./GlobalState";
import {WelcomeScreen} from "./WelcomeScreen/WelcomeScreen";

import {axiosInstance} from "./components/helpers/connectionInstances";
import {getFromMemory} from "./components/helpers/utils";
import {MainNavWrapper} from "./MainNav/MainNavWrapper";


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalState: {},
        }
    }

    updateGlobalState = (user, token, loggedIn = false, callback = null) => {
        this.setState({
            globalState: {
                loggedIn: loggedIn,
                user: user,
                token: token
            }
        }, () => callback !== null ? callback() : null)

    }

    refreshState = (token, callback = null) => {
        axiosInstance
            .get("/user/getCurrent", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .then((response) => {
                console.log(`Tried checking current user ${JSON.stringify(response.data.user.username)}`)
                if (response.data.user.username != null) {
                    this.updateGlobalState(response.data.user, token, true, () => {
                        callback !== null ? callback() : null
                    })

                }
            })
            .catch((error) => {
                console.log(`Error in App.js ${error}`)
                console.log(error);
            });

    }

    componentDidMount() {

        getFromMemory("token").then((memToken) => {
            //TODO: this is not safe!
            let token;
            if (memToken != null) token = memToken
            else if (this.state.globalState.token != null) token = this.state.globalState.token

            if (token != null) {

                this.refreshState(token)

            }

        });
    }

    render() {
        return (
            <GlobalContext.Provider
                value={{
                    globalState: this.state.globalState,
                    updateGlobalState: this.updateGlobalState,
                    refreshState: this.refreshState
                }}
            >

                {this.state.globalState.loggedIn ? <MainNavWrapper/> : <WelcomeScreen/>}

            </GlobalContext.Provider>
        );
    }
}