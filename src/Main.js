import React from 'react';
import GlobalContext from "./components/atoms/GlobalState";


import {axiosInstance} from "./utilities/ConnectionUtils";
import {getFromMemory} from "./utilities/StorageUtils";
import {MainNav} from "./navigation/MainNav";
import AuthScreen from "./screens/screens/AuthScreen";


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

                {this.state.globalState.loggedIn ? <MainNav/> : <AuthScreen/>}

            </GlobalContext.Provider>
        );
    }
}
