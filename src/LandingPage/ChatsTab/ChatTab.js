import React from "react";
import Title from "react-native-paper/src/components/Typography/Title";


export default class ChatTab extends React.Component {
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

                this.props.socket.socket.emit('joinChats', response, (error, another_response) => {
                    if (error) console.log(`Error in chat.list.js ${error}`)
                    else console.log(`response in joining chats ${another_response}`)
                })
            }
        })
    }

    componentDidMount() {
        // this.getChats()
    }

    render() {
        return (
            <>
                <Title>Chats</Title>
                {/*<FlatList*/}
                {/*    data={this.state.chats}*/}
                {/*    refreshControl={<RefreshControl*/}
                {/*        colors={["#9Bd35A", "#689F38"]}*/}
                {/*        refreshing={this.state.isFetching}*/}
                {/*        onRefresh={() => this.onRefresh()}/>}*/}
                {/*    renderItem={({item}) => <ChatListItem {...this.props} data={item}/>}*/}
                {/*    keyExtractor={item => item.chatId}*/}
                {/*/>*/}


            </>
        );
    }
}