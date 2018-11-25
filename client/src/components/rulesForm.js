import React from 'react'
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Grid,
  Row
} from 'react-bootstrap'
import PropTypes from 'prop-types'
import RuleTranslator from '../service/ruleTranslator'
import { facts, ops, type, factsDefaultValues, factOps } from './rules_data'

export default class RulesForm extends React.Component {
  constructor (props) {
    super(props)
    this.facts = facts
    this.ops = ops
    this.type = type
    this.state = {
      conditions: [],
      fact: this.facts[0],
      value: null,
      operator: this.ops[0],
      type: this.type[0],
      params: 10
    }
    this.defaultValue = factsDefaultValues[this.facts[0]]
  }

  checkValue (name, event) {
    if (name === 'value' || name === 'params') {
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
    if (name === 'fact') {
      this.defaultValue = factsDefaultValues[event.target.value]
      this.setState({
        operator: factOps[event.target.value][0]
      })
    }
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

  getValue (value) {
    if (JSON.stringify(value) === 'null') {
      return this.defaultValue
    } else if (JSON.stringify(value) === 'NaN') {
      return this.defaultValue
    }
    return value
  }

  addCondition = () => {
    this.state.conditions.push({
      fact: this.state.fact,
      operator: this.state.operator,
      value: this.getValue(this.state.value)
    })
    this.setState({
      'conditions': this.state.conditions
    })
  }

  removeCondition = () => {
    this.state.conditions.pop()
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
            { this.showOptions(factOps[this.state.fact]) }
          </FormControl>
          <FormControl type="text" placeholder={this.defaultValue} onChange={this.handleChange('value')}/>
        </Col>
        <Col smOffset={12} sm={10}>
          <Button type="button" onClick={ this.addCondition }>
            +
          </Button>
        </Col>
        <Col smOffset={12} sm={10}>
          <Button type="button" onClick={ this.removeCondition }>
            -
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
          <FormControl type="text" placeholder='10' onChange={this.handleChange('params')}/>
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

  refresh () {
    if (!this.props.refresh) {
      return
    }
    this.setState({
      conditions: [],
      fact: this.facts[0],
      value: 10,
      operator: this.ops[0],
      type: this.type[0],
      params: 10
    })
    this.props.desactivateRefresh()
  }

  render () {
    this.refresh()
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
  desactivateRefresh: PropTypes.func,
  onClick: PropTypes.func,
  errors: PropTypes.object,
  refresh: PropTypes.bool
}
