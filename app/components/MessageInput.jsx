import React from 'react';

class MessageInput extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <form onSubmit={this.props.click}>
                <input type="text" 
                    id="message" 
                    placeholder="new message..."
                    maxLength="100"
                    onChange={this.props.change}
                    value={this.props.value} />
                <p><em><small>press enter to send</small></em></p>
            </form>
        );
    }
}

export default MessageInput