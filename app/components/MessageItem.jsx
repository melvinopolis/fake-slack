import React from 'react';

class MessageItem extends React.Component {
    constructor() {
        super();     
    }

    renderEditButton() {
        if (this.props.message.user === this.props.currentUser) {
            return  <span className="edit-button" onClick={this.props.editClick}>x</span>
        }
    }

    

    // renderEditForm() {
    //     //move to render method
    //     //if state = true
    //     return (
    //         <form onSubmit={this.props.update}>
    //             <input type="text" value={this.props.message.text} />
    //         </form>
    //     )
    // }



  render() {
    if (this.props.message.editing === true ) {
      return (
        <form onSubmit={this.props.update}>
            <input type="text" value={this.props.message.text} />
        </form>
      )
    } else {
      return (
        <li className={this.props.className}>
          <strong>{this.props.message.user}</strong> <em><small>{this.props.message.time}</small></em>
          <br />{this.props.message.text}
          {this.renderEditButton()}
        </li>
      );
    }
  }
}

export default MessageItem