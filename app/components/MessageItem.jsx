import React from 'react';

class MessageItem extends React.Component {
    constructor() {
        super();        
    }

    render() {
        return (
            <li className={this.props.className}>
                <strong>{this.props.message.user}</strong> <em><small>{this.props.message.time}</small></em>
                <br />{this.props.message.text}
            </li>
        );

    }
}

export default MessageItem