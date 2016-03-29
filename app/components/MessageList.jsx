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
      messages: [],
      editing: false
    }

    this.ref = new Firebase('https://sweltering-torch-1419.firebaseio.com/messages/');
    this.mainRef = new Firebase('https://sweltering-torch-1419.firebaseio.com/');
  }

  componentWillMount() {
		let token = localStorage.getItem('authToken');
		if (token) {
			this.mainRef.authWithCustomToken(token, this.authHandler.bind(this));
		}
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
		this.mainRef.authWithOAuthPopup(provider, this.authHandler.bind(this));
	}

	authHandler(err, authData) {
		if (err) {
			console.log(err);
			return;
		} 

		let token = authData.token
		localStorage.setItem('authToken', token);

		let username;
		if (authData.github) {
			localStorage.setItem('username', authData.github.username);
			username = authData.github.username;
		} else {
			username = localStorage.getItem('username')
		}

		this.setState({
			currentUser: {
				uid: authData.uid,
				username: username
			}
		})
	}

	logout() {
		this.mainRef.unauth();
		localStorage.removeItem('authToken');
		localStorage.removeItem('username');
		this.setState({
			currentUser: {
				uid: null,
				username: null
			}
		})
	}

  handleChange(event) {
    let newInput = event.target.value;
    this.setState({
      inputValue: newInput
    }); 
  }	

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.currentUser) {
    	return alert('please log in to post messages!')
    }

    if (this.state.inputValue != '') {
      let newMessage = {
        text: this.state.inputValue,
        time: new Moment().format('ddd, h:mm a'),
        user: this.state.currentUser.username,
        editing: false
      }

      this.ref.push(newMessage)
      this.setState({
        inputValue: ''
      })
    }
  }

  handleEditClick() {
    console.log('editing!');
  }

  updateMessage() {
  	console.log('updating!');
  }

  render() {
    let currentUser = this.state.currentUser.username;
    let editClick = this.handleEditClick.bind(this);
    let updateMessage = this.updateMessage.bind(this);
    let messageClass;
    let messageList = this.state.messages.map(function(message, i){
      if (message.user === currentUser) {
        messageClass = 'yours'
      } else {
        messageClass = 'regular'
      }
            
      return <MessageItem key={i} 
      					message={message} 
      					user={message.user} 
      					className={messageClass} 
      					currentUser={currentUser}
      					editClick={editClick}
      					update={updateMessage}/>
    }).reverse();

    return (
      <div>
      	<Nav login={this.login.bind(this, 'github')} logout={this.logout.bind(this)} user={this.state.currentUser} />
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