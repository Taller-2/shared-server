import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const LoggedNavbar = function(props) {
	return (
		<Navbar>
			<Nav>
				<LinkContainer exact to="/">
					<NavItem eventKey={1}>Home</NavItem>
				</LinkContainer>
				<LinkContainer to="/about">
					<NavItem eventKey={2}>About</NavItem>
				</LinkContainer>
				<LinkContainer to="/logout">
					<NavItem eventKey={2}>Salir</NavItem>
				</LinkContainer>
			</Nav>
		</Navbar>
	)
}

export default LoggedNavbar