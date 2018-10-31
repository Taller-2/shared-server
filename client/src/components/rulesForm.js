import React from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Row, HelpBlock } from 'react-bootstrap'
import PropTypes from 'prop-types'
import RuleTranslator from '../service/ruleTranslator'

export default class RulesForm extends React.Component {
  constructor (props) {
    super(props)
    this.facts = [
      'daytrips',
      'monthtrips',
      'antiquity',
      'userScore',
      'paymentMethod',
      'duration',
      'distance',
      'latitud',
      'longitud',
      'date',
      'time',
      'serverId',
      'tripDate',
      'tripTime',
      'email',
      'price'
    ]
    this.ops = [
      'equal',
      'greaterThanInclusive',
      'lessThanInclusive',
      'greaterThan',
      'domainEqual',
      'lessThan'
    ]
    this.type = [
      'percentage',
      'factor',
      'sum',
      'discount',
      'surcharge',
      'free',
      'disabled'
    ]
    this.state = {
      conditions: [],
      fact: this.facts[0],
      value: '',
      operator: this.ops[0],
      type: this.type[0],
      params: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  submit = (event) => {
    event.preventDefault()
    this.props.onClick(this.state)
  }

  showOptions (options) {
    return (
      options.map((option, index) => {
        return (<option key={index} value={option}>{option}</option>)
      })
    )
  }

  addCondition = () => {
    this.state.conditions.push({
      fact: this.state.fact,
      operator: this.state.operator,
      value: this.state.value
    })
    this.setState({
      'conditions': this.state.conditions
    })
  }

  condition () {
    return (
      <FormGroup controlId="condition">
        <Col componentClass={ControlLabel} sm={2}>
          Condition
        </Col>
        <Col sm={10}>
          <FormControl componentClass="select" placeholder="Type" onChange={this.handleChange('fact')}>
            { this.showOptions(this.facts) }
          </FormControl>
          <FormControl componentClass="select" placeholder="Type" onChange={this.handleChange('operator')}>
            { this.showOptions(this.ops) }
          </FormControl>
          <FormControl type="text" placeholder="value" onChange={this.handleChange('value')}/>
          <HelpBlock>
            <p className="text-danger">{this.props.errors.value}</p>
          </HelpBlock>
        </Col>
        <Col smOffset={12} sm={10}>
          <Button type="" onClick={ this.addCondition }>
            +
          </Button>
        </Col>
      </FormGroup>
    )
  }

  consequence () {
    return (
      <FormGroup controlId="condition">
        <Col componentClass={ControlLabel} sm={2}>
          Consequence
        </Col>
        <Col sm={10}>
          <FormControl componentClass="select" placeholder="Type" onChange={this.handleChange('type')}>
            { this.showOptions(this.type) }
          </FormControl>
          <FormControl type="text" placeholder="value" onChange={this.handleChange('params')}/>
          <HelpBlock>
            <p className="text-danger">{this.props.errors.params}</p>
          </HelpBlock>
        </Col>
      </FormGroup>
    )
  }

  listConditions () {
    let translatedConditions = []
    this.state.conditions.forEach((aCondition) => {
      translatedConditions.push(RuleTranslator.getCondition(aCondition))
    })
    return (
      <FormGroup controlId="condition">
        <Col sm={10}>
          { this.showOptions(translatedConditions) }
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
        </Col>
      </FormGroup>
    )
  }

  render () {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={4} mdOffset={9}>
            <Form horizontal>
              { this.listConditions() }
            </Form>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12} md={6} mdOffset={3}>
            <Form horizontal>
              { this.condition() }
              { this.consequence() }
              { this.accept() }
            </Form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

RulesForm.propTypes = {
  onClick: PropTypes.func,
  errors: PropTypes.object
}
