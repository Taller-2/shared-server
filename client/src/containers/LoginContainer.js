import React from 'react'
import LoginForm from '../components/LoginForm'
import { Redirect } from 'react-router-dom'
import Http from '../service/Http'
import PropTypes from 'prop-types'

LoginContainer.propTypes = {
	onLogin: PropTypes.func,
	location: PropTypes.exact({
		state: PropTypes.string
	}),
}

export default class LoginContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			redirectToReferrer: false
		}
	}

	handleClick(email, pass) {
		Http.post('/session/', {email, pass})
			.then(respose => {
				sessionStorage.setItem('auth', respose.token)
				this.setState({ redirectToReferrer: true })
				this.props.onLogin() // Hack para que se refresque la NavBar
			})
			.catch(err => {
				alert('Auth Error' + err) //TODO hacer algo
			})
	}

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
		const token = sessionStorage.getItem('auth')
		const { redirectToReferrer } = this.state

		if (redirectToReferrer) {
			return <Redirect to={from} />
		}
		if (token) {
			return <Redirect to='/' />
		}
		
		return (
			<LoginForm onClick={(user, pass) => this.handleClick(user, pass)} />
		)
	}
}