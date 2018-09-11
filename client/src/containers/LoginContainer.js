import React from 'react'
import LoginForm from '../components/LoginForm'
import jwt_decode from 'jwt-decode'

export default class LoginContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			errors: []
		}
	}

	async postLogin(body) {
		const rawResponse = await fetch('/session/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
		const content = await rawResponse.json()

		console.log(content)
		return content
	};

	handleClick(email, pass) {
		console.log('email: ' + email)
		console.log('pass: ' + pass)
		this.postLogin({email, pass})
		.then(respose => {
			console.log('promise resolved')
			console.log(respose)
			console.log(jwt_decode(respose.token));
		})
		.catch(err => {
			console.log('whoops')
			console.log(err)
		})
	}

	render() {
		return (
			<LoginForm onClick={(user, pass) => this.handleClick(user, pass)} />
		)
	}
}