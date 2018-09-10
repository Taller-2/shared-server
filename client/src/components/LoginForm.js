import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class LoginForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
	    user: '',
			pass: '',
		}
	}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
		return (
			<div>
				<AppBar>
					Login
				</AppBar>
				<TextField id="user"
					onChange={this.handleChange('user')}
				/>
				<br/>
				<TextField id="pass"
					type="password"
					onChange={this.handleChange('pass')}
				/>
				<br/>
				<Button onClick={ () => this.props.onClick(this.state.user, this.state.pass) }>
					Submit
				</Button>
			</div>
    );
  }
}

export default LoginForm;