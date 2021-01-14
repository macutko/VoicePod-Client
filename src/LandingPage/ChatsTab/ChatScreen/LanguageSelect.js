import React from "react"
import {FlatList, Modal} from "react-native";
import {SocketContext} from "../../SocketContextWrapper";
import LanguageOption from "./LanguageOption";


export default class LanguageSelect extends React.Component {
    static contextType = SocketContext

    constructor(props) {
        super(props);
        this.state = {
            languages: []
        }
    }

    componentDidMount() {
        this.context.socket.emit('getLanguageOptions', {}, (error, response) => {
            if (error) console.log(`Error in LanguageSelect ${error}`)
            if (response) {
                this.setState({
                    languages: response
                })
            }
        })
    }


    render() {
        return (
            <>
                <Modal
                    visible={this.props.modalOpen}
                    transparent={false}
                    animationType="fade"
                >
                    <FlatList
                        data={this.state.languages}
                        renderItem={({item}) => <LanguageOption {...this.props} data={item}/>}
                        keyExtractor={item => item}
                    />

                </Modal>

            </>
        );
    }
}