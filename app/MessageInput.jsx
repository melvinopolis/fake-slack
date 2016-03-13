import React from 'react';

export class MessageInput extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <form>
                <label htmlFor="message">Send a Message</label>

                <input type="text" 
                    id="message" 
                    onChange={this.props.change}
                    value={this.props.value} />

                <button onClick={this.props.click}>Send</button>
            </form>
        );
    }
}