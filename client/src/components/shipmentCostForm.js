import React from 'react'
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Grid,
  Row,
  HelpBlock
} from 'react-bootstrap'
import PropTypes from 'prop-types'
import { facts } from './rules_data'

export default class ShipmentCostForm extends React.Component {
  constructor (props) {
    super(props)
    this.facts = facts
    this.state = {
      fact: this.facts[0],
      value: null
    }
  }

  checkValue (name, event) {
    if (name === 'value') {
      if (!isNaN(event.target.value)) {
        return parseInt(event.target.value, 10)
      }
    }
    return event.target.value
  }

  handleChange = name => event => {
    this.setState({
      [name]: this.checkValue(name, event)
    })
  }

  submit = (event) => {
    event.preventDefault()
    this.props.onClick(this.state.fact, this.state.value)
  }

  showOptions (options) {
    return (
      options.map((option, index) => {
        return (<option key={index} value={option}>{option}</option>)
      })
    )
  }

  showFacts () {
    return (
      <FormGroup controlId="Facts">
        <Col componentClass={ControlLabel} sm={2}>
          Facts
        </Col>
        <Col sm={10}>
          <FormControl componentClass="select" placeholder="Type" onChange={this.handleChange('fact')}>
            { this.showOptions(this.facts) }
          </FormControl>
          <FormControl type="text" placeholder="insert a value" onChange={this.handleChange('value')}/>
        </Col>
      </FormGroup>
    )
  }

  accept () {
    return (
      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit" onClick={ this.submit }>
            Aceptar
          </Button>
          <HelpBlock>
            <p className="text-danger">{ this.props.errors.value ? 'Invalid value type' : '' }</p>
          </HelpBlock>
        </Col>
      </FormGroup>
    )
  }

  showCost () {
    return (
      <FormGroup controlId="Facts">
        <Col componentClass={ControlLabel} sm={2}>
          Cost
        </Col>
        <Col sm={10}>
          <FormControl type="text" placeholder={this.props.cost}>
          </FormControl>
        </Col>
      </FormGroup>
    )
  }

  render () {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={6} mdOffset={3}>
            <Form horizontal>
              { this.showFacts() }
              { this.accept() }
              { this.showCost() }
            </Form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

ShipmentCostForm.propTypes = {
  onClick: PropTypes.func,
  errors: PropTypes.object,
  cost: PropTypes.string
}
