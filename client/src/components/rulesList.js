import React from 'react'
import { Col, Form, Grid, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class RulesListForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  submit = (aRule) => {
    this.props.deleteRule(aRule)
  }

  showList () {
    return (
      <div>
        <h2></h2>
        { this.props.rules.map((aRule, idx) =>
          <div className="panel panel-default" key={idx}>
            <div className="panel-heading">{aRule.coloquialRule}</div>
            <button
              className="btn btn-default" type="submit" onClick={() => this.submit(aRule) }
            >Delete
            </button>
          </div>
        )}
      </div>
    )
  }

  render () {
    this.props.getRules()
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={6} mdOffset={3}>
            <Form horizontal>
              { this.showList() }
            </Form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

RulesListForm.propTypes = {
  getRules: PropTypes.func,
  deleteRule: PropTypes.func,
  errors: PropTypes.object,
  rules: PropTypes.array
}
