// import style from './styles/';
import React from 'react';
import ReactDOM from 'react-dom';

class MessageInput extends React.Component {
    constructor() {
        super();
        this.state = {
            messageInput: '',
            messages: [
                {
                    text: "message 1",
                    time: "8:15",
                    user: "steve"
                },
                {
                    text: "hi everyone",
                    time: "8:20",
                    user: "joe"
                },
                {
                    text: "anyone there?",
                    time: "8:25",
                    user: "jane"
                },
                {
                    text: "sup",
                    time: "8:30",
                    user: "lee"
                },
            ]
        }
    }

    handleClick() {
        if (this.state.messageInput != '') {
            //copies messages array
            var newMessage = this.state.messages.slice()
            //pushes new message into copy
            newMessage.push({
                    text: this.state.messageInput,
                    time: "7:30",
                    user: 'lee'
                })
            this.setState({
                //replaces message array with copied array
                messages: newMessage,
                messageInput: ''
            })
        }
    }

    handleChange(event) {
        var input = event.target.value;
        this.setState({
            messageInput: input
        });
    }

	render() {
        var currentUser = "lee";
        var redMessage = {
            color: 'red'
        }
        var blackMessage = {
            color: 'black'
        }
        var messageArray = Array.from(this.state.messages)
        var messageItems = messageArray.map((message, i) => {
            if (currentUser === message.user) {
                return (<li key={i} style={redMessage}>
                            <strong>{message.user}</strong> says:
                            <p>{message.text}</p>
                            <em>{message.time}</em>
                        </li>);
            } else {
                return (<li key={i}>
                            <strong>{message.user}</strong> says:
                            <p>{message.text}</p>
                            <em>{message.time}</em>
                        </li>);
            }  
        })
        messageItems = messageItems.reverse();

        if ( messageItems.length > 3 ) {
            var showMessages = [];
            for (var i = 0; i < 3; i++) {
                showMessages.push(messageItems.shift());
            }   
        }

		return (
            <div>
                <label htmlFor="message">Send a Message</label>

                <input type="text" 
                    id="message" 
                    value={this.state.messageInput}
                    onChange={this.handleChange.bind(this)}/>

                <button onClick={this.handleClick.bind(this)}>Send</button>

                <ul>
                    {showMessages}
                </ul>

                <button>load more messages</button>
            </div>
		)
	}
}

var loadPoint = document.querySelector('#app');
ReactDOM.render(<MessageInput />, loadPoint);