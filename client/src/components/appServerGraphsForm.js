import React from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Row, HelpBlock } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

export default class AppServerGraphsForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentOption: '',
      type: this.props.types[0]
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  submit = (event) => {
    event.preventDefault()
    this.props.onClick(this.state.currentOption, this.state.type)
  }

  showOptions (options) {
    return (
      options.map((option, index) => {
        return (<option key={index} value={option}>{option}</option>)
      })
    )
  }

  showGraphsOptions () {
    return (
      <FormGroup controlId="2">
        <Col componentClass={ControlLabel} sm={2}>
          Options description
        </Col>
        <Col sm={10}>
          <FormControl componentClass="select" placeholder="Type" onChange={this.handleChange('currentOption')}>
            { this.showOptions(this.props.graphTitles) }
          </FormControl>
          <HelpBlock>
            <p className="text-danger">{this.props.errors.value}</p>
          </HelpBlock>
        </Col>
        <Col sm={10}>
          <FormControl componentClass="select" placeholder="Type" onChange={this.handleChange('type')}>
            { this.showOptions(this.props.types) }
          </FormControl>
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
          <Col xs={12} md={6} mdOffset={3}>
            <Form horizontal>
              { this.showGraphsOptions() }
              { this.accept() }
            </Form>
          </Col>
        </Row>
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={ this.props.options }
          />
        </div>
      </Grid>
    )
  }
}

AppServerGraphsForm.propTypes = {
  types: PropTypes.array,
  onClick: PropTypes.func,
  errors: PropTypes.object,
  options: PropTypes.object,
  graphTitles: PropTypes.array
}
