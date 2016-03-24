import React from 'react';
import Moment from 'moment';
import Firebase from 'firebase';
//components
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';
import Nav from './Nav';

class MessageList extends React.Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      currentUser: {},
      messages: []
    }

    this.ref = new Firebase('https://sweltering-torch-1419.firebaseio.com/messages/');
    this.mainRef = new Firebase('https://sweltering-torch-1419.firebaseio.com/');
  }

  componentWillMount() {
		// check to see if token exists. if so, log in
		// var token = localStorage.getItem('token');
		// console.log(token);
		// if (token) {
		// 	this.mainRef.authWithCustomToken(token, this.authHandler.bind(this));
		// }
	}

  componentDidMount(){
  	// set state to match firebase
    this.ref.on('child_added', (snapshot) => {
    	this.setState({
      	messages: this.state.messages.concat(snapshot.val())
    	})
    })
	}

	login(provider, event) {
		event.preventDefault();
		console.log('logging in with ' + provider);
		this.mainRef.authWithOAuthPopup(provider, this.authHandler.bind(this));
	}

	authHandler(err, authData) {
		if (err) {
			console.log(err);
			return;
		} 

		// save token so user stays logged in on refresh
		// localStorage.setItem('token', authData.token);

		// console.log(authData.github.username);

		this.setState({
			currentUser: {
				uid: authData.uid,
				username: authData.github.username
			}
		})
		// console.log(this.state.currentUser.username);
	}

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.currentUser) {
    	return alert('please log in to post messages!')
    }

    if (this.state.inputValue != '') {
      var newMessage = {
        text: this.state.inputValue,
        time: new Moment().format('ddd, h:mm a'),
        user: this.state.currentUser.username
      }

      console.log(newMessage)
      this.ref.push(newMessage)
      this.setState({
        inputValue: ''
      })
    }
  }

  handleChange(event) {
    let newInput = event.target.value;
    this.setState({
      inputValue: newInput
    }); 
  }

  render() {
    let currentUser = this.state.currentUser.username;
    let messageClass;
    let messageList = this.state.messages.map(function(message, i){
      if (message.user === currentUser) {
        messageClass = 'yours'
      } else {
        messageClass = 'regular'
      }
            
      return <MessageItem key={i} message={message} user={message.user} className={messageClass}/>
    }).reverse();

    return (
      <div>
      	<Nav login={this.login.bind(this, 'github')} user={this.state.currentUser} />
      	<MessageInput click={this.handleSubmit.bind(this)} 
          	change={this.handleChange.bind(this)} 
          	value={this.state.inputValue} />
        <ul className="message-list">
          {messageList}
        </ul>
      </div>
    );
  }
}

export default MessageList