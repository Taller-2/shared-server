import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const LoggedNavbar = function () {
  return (
    <Navbar>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem eventKey={1}>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/app-server-status">
          <NavItem eventKey={2}>Estado de servidores</NavItem>
        </LinkContainer>
        <LinkContainer to="/addRules">
          <NavItem eventKey={2}>Agregar reglas</NavItem>
        </LinkContainer>
        <LinkContainer to="/rulesList">
          <NavItem eventKey={2}>Lista de reglas</NavItem>
        </LinkContainer>
        <LinkContainer to="/appServerGraphs">
          <NavItem eventKey={2}>App Server Graphics</NavItem>
        </LinkContainer>
        <LinkContainer to="/logout">
          <NavItem eventKey={2}>Salir</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
  )
}

export default LoggedNavbar
