import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import { MessageItem } from './MessageItem';
import { MessageInput } from './MessageInput';

class MessageList extends React.Component {
    constructor() {
        super();

        this.state = {
            inputValue: '',
            currentUser: 'mariel',
            messages: [
                {
                    text: 'hello world',
                    time: '3:30',
                    user: 'mariel'
                },
                {
                    text: 'yooooo',
                    time: '3:40',
                    user: 'emily'
                },
                {
                    text: 'yay react',
                    time: '3:50',
                    user: 'mariel'
                }
            ]
        }
    }

    handleClick(event) {
        event.preventDefault();
        if (this.state.inputValue != '') {
            var newMessage = this.state.messages.slice()
            newMessage.push({
                    text: this.state.inputValue,
                    time: "7:30",
                    user: this.state.currentUser
                })
            this.setState({
                messages: newMessage,
                inputValue: ''
            })
        }
    }

    handleChange(event) {
        let newInput = event.target.value;
        console.log(newInput)
        this.setState({
            inputValue: newInput
        }); 
    }

    render() {
        let currentUser = this.state.currentUser;
        let messageStyle;
        let messageList = this.state.messages.map(function(message, i){
            if (message.user === currentUser) {
                messageStyle = {color: 'red'}
            } else {
                messageStyle = {color: 'grey'}
            }
            
            return <MessageItem key={i} message={message} user={message.user} style={messageStyle} />
        }).reverse();

        return (
            <div>
                <MessageInput   click={this.handleClick.bind(this)} 
                                change={this.handleChange.bind(this)} 
                                value={this.state.inputValue} />
                <ul>
                    {messageList}
                </ul>
            </div>
        );
    }
}

var loadPoint = document.querySelector('#app');
ReactDOM.render(<MessageList />, loadPoint);