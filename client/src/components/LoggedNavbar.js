import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const LoggedNavbar = function () {
  return (
    <Navbar>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem eventKey={1}>Estado de servidores</NavItem>
        </LinkContainer>
        <LinkContainer to="/appServerGraphs">
          <NavItem eventKey={2}>Actividad de servidores</NavItem>
        </LinkContainer>
        <LinkContainer to="/payments">
          <NavItem eventKey={3}>Pagos</NavItem>
        </LinkContainer>
        <LinkContainer to="/shipments">
          <NavItem eventKey={4}>Envíos</NavItem>
        </LinkContainer>
        <LinkContainer to="/addRules">
          <NavItem eventKey={5}>Agregar reglas</NavItem>
        </LinkContainer>
        <LinkContainer to="/rulesList">
          <NavItem eventKey={6}>Lista de reglas</NavItem>
        </LinkContainer>
        <LinkContainer to="/shipment-cost">
          <NavItem eventKey={7}>Simular costo de envio</NavItem>
        </LinkContainer>
        <LinkContainer to="/logout">
          <NavItem eventKey={8}>Salir</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
  )
}

export default LoggedNavbar
