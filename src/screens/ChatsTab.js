import React from "react";
import {FlatList, RefreshControl} from "react-native";
import ChatListItem from "../___________MainNav/ChatsTab/ChatList.item";


export default class ChatsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            isFetching: false,
        }
    }

    onRefresh() {
        this.setState({isFetching: true}, () => {
            this.getChats();
        });
    }

    getChats = () => {

        this.props.socket.emit('getChats', {}, (error, response) => {
            if (error === null) {
                this.setState({chats: response, isFetching: false})
            } else {
                console.log(`Error in Chat Tab ${error}`)
            }
        })
    }

    componentDidMount() {
        this.getChats()
    }

    render() {
        return (
            <>

                <FlatList
                    data={this.state.chats}
                    refreshControl={<RefreshControl
                        // colors={["#9Bd35A", "#689F38"]}
                        refreshing={this.state.isFetching}
                        onRefresh={() => this.onRefresh()}/>}
                    renderItem={({item}) => <ChatListItem {...this.props} data={item}/>}
                    keyExtractor={item => item.id}
                />

            </>
        );
    }
}