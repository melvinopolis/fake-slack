// import style from './styles/';
import React from 'react';
import ReactDOM from 'react-dom';

class MessageInput extends React.Component {
	render() {
        var messages = [
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
        ];

        var currentUser = "lee";
        var redMessage = {
            color: 'red'
        }
        var blackMessage = {
            color: 'black'
        }
        var messageItems = messages.map(function(message){
            if (currentUser === message.user) {
                return (<li key={message.user} style={redMessage}>
                            <strong>{message.user}</strong> says:
                            <p>{message.text}</p>
                            <em>{message.time}</em>
                        </li>);
            } else {
                return (<li key={message.user}>
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
                <input type="text" id="message" />
                <button>Send</button>

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