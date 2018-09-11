import React, { Component } from 'react'
import LoginContainer from './containers/LoginContainer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import logo from './logo.svg'

import './App.css'

class App extends Component {
	constructor (props) {
		super(props)
		this.state = { 
			user: null, 
			token: null 
		}
	}

	componentDidMount () {
		this.callApi()
			.then(res => this.setState({ response: res.message }))
			.catch(err => console.log(err))
	}

	async callApi () {
		const response = await fetch('/hello')
		const body = await response.json()

		if (response.status !== 200) throw Error(body.message)

		return body
	}

	render () {
		return (
			<React.Fragment>
				<div>
					<Router>
						<div>
							<Navbar>
								<Nav>
									<LinkContainer exact to="/">
										<NavItem eventKey={1}>Home</NavItem>
									</LinkContainer>
									<LinkContainer to="/login">
										<NavItem eventKey={2}>Login</NavItem>
									</LinkContainer>
									<LinkContainer to="/about">
										<NavItem eventKey={2}>About</NavItem>
									</LinkContainer>
								</Nav>
							</Navbar>

							<Route exact path="/" component={Home} />
							<Route path="/login" component={LoginContainer} />
							<Route path="/about" component={About} />
						</div>
					</Router>
					
				</div>
			</React.Fragment>
		)
	}
} 
		
const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
)

const About = () => (
	<div>
		<h2>About</h2>
	</div>
)

export default App
