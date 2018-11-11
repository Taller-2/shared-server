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
          <NavItem eventKey={3}>Agregar reglas</NavItem>
        </LinkContainer>
        <LinkContainer to="/rulesList">
          <NavItem eventKey={4}>Lista de reglas</NavItem>
        </LinkContainer>
        <LinkContainer to="/appServerGraphs">
          <NavItem eventKey={5}>App Server Graphics</NavItem>
        </LinkContainer>
        <LinkContainer to="/payments">
          <NavItem eventKey={6}>Pagos</NavItem>
        </LinkContainer>
        <LinkContainer to="/shipments">
          <NavItem eventKey={7}>Envíos</NavItem>
        </LinkContainer>
        <LinkContainer to="/shipment-cost">
          <NavItem eventKey={8}>Simular costo de envio</NavItem>
        </LinkContainer>
        <LinkContainer to="/logout">
          <NavItem eventKey={8}>Salir</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
  )
}

export default LoggedNavbar
