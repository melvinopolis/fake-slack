import React from 'react';

export class MessageItem extends React.Component {
    constructor() {
        super();

        MessageItem.propTypes = { item: React.PropTypes.object };
    }

    render() {
        return (
            <li style={this.props.style}>
                <strong>{this.props.message.user}</strong> <em>{this.props.message.time}</em><br />
                {this.props.message.text}
            </li>
        );

    }
}