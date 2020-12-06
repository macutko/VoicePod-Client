import React from "react";
import StartChatButton from "../StartChatModal/StartChatButton";
import {FlatList, RefreshControl} from "react-native";
import ChatListItem from "./ChatList.item";


export default class ChatList extends React.Component {
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
        this.props.socket.socket.emit('getChats', {}, (error, response) => {
            if (error === null) {
                this.setState({chats: response, isFetching: false})
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
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={this.state.isFetching}
                        onRefresh={() => this.onRefresh()}/>}
                    renderItem={({item}) => <ChatListItem {...this.props} data={item}/>}
                    keyExtractor={item => item.chatId}
                />


                <StartChatButton refreshList={this.onRefresh}/>
            </>
        );
    }
}