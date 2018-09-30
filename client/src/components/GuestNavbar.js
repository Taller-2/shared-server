import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const GuestNavbar = function () {
  return (
    <Navbar>
      <Nav>
        <LinkContainer to="/login">
          <NavItem eventKey={2}>Ingresar</NavItem>
        </LinkContainer>
        <LinkContainer to="/register">
          <NavItem eventKey={2}>Registrarse</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
  )
}

export default GuestNavbar
