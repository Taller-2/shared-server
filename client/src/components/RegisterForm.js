import React from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Row, HelpBlock } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class RegisterForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      mail: '',
      pass: '',
      passConfirmation: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  submit = (event) => {
    event.preventDefault(); this.props.onClick(this.state.name, this.state.email, this.state.pass, this.state.passConfirmation)
  }

  render () {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={6} mdOffset={3}>
            <h1 style={{ textAlign: 'center' }} > Registrarse </h1>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12} md={6} mdOffset={3}>
            <Form horizontal>
              <FormGroup controlId="name">
                <Col componentClass={ControlLabel} sm={2}>
                  Nombre
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Nombre" onChange={this.handleChange('name')}/>
                  <HelpBlock>
                    <p className="text-danger">{this.props.errors.name}</p>
                  </HelpBlock>
                </Col>
              </FormGroup>

              <FormGroup controlId="email">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl type="email" placeholder="Email" onChange={this.handleChange('email')}/>
                  <HelpBlock>
                    <p className="text-danger">{this.props.errors.email}</p>
                  </HelpBlock>
                </Col>
              </FormGroup>

              <FormGroup controlId="pass">
                <Col componentClass={ControlLabel} sm={2}>
                  Contraseña
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Contraseña" onChange={this.handleChange('pass')}/>
                  <HelpBlock>
                    <p className="text-danger">{this.props.errors.pass}</p>
                  </HelpBlock>
                </Col>
              </FormGroup>

              <FormGroup controlId="passConfirmation">
                <Col componentClass={ControlLabel} sm={2}>
                  Confirmar
                </Col>
                <Col sm={10}>
                  <FormControl type="passConfirmation" placeholder="Confirmar contraseña" onChange={this.handleChange('passConfirmation')}/>
                  <HelpBlock>
                    <p className="text-danger">{this.props.errors.passConfirmation}</p>
                  </HelpBlock>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit" onClick={ this.submit }>
                    Aceptar
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

RegisterForm.propTypes = {
  onClick: PropTypes.func,
  errors: PropTypes.object
}
