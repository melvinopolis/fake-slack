import React from 'react';

class Nav extends React.Component {

	render() {
		if (this.props.user.uid) {
			return (
				<nav>
					<span className="logo">
						<img src={require('url?mimetype=image/png!../img/slick.png')} />
					</span>
					<span className="logged-in">
						<span>logged in as <strong>{this.props.user.username}</strong></span>
						<button onClick={this.props.logout}>logout</button>
					</span>
				</nav>
			)
		} 
		// else {
			return (
				<nav>
				<span className="logo">
					<img src={require('url?mimetype=image/png!../img/slick.png')} />
				</span>
				
				<button onClick={this.props.login}>login with github</button>
				</nav>
			)
		// }
	}
}

export default Nav