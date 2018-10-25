import React from 'react'
import { Col, Form, Grid, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Http from '../service/Http'
import RuleTranslator from '../service/ruleTranslator'

export default class RulesListForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rules: [{
        'rule': [],
        'coloquialRule': '',
        'id': ''
      }],
      haveTheRules: false,
      refresh: false
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  submit = (event) => {
    event.preventDefault()
    this.props.onClick(this.state)
  }

  handleClick = () => {
    if (this.state.haveTheRules) return
    var rulesVector = []
    Http.get('/rules/')
      .then(response => {
        // expected: { success: true, rules: rules }
        if (response.success) {
          const length = response.rules.length
          for (var i = 0; i < length; i++) {
            const aRule = response.rules[i].json
            const ruleTranslated = RuleTranslator.translateRule(aRule)
            const id = response.rules[i].id
            rulesVector.push(
              {
                'rule': aRule,
                'coloquialRule': ruleTranslated,
                'id': id
              })
          }
          this.handleChange('rules', rulesVector)
          this.handleChange('haveTheRules', true)
        } else {
          alert('Error: 200 status was not received')
        }
      })
      .catch(err => {
        alert(err) // TODO hacer algo
      })
  }

  deleteRule = (aRule) => {
    Http.delete('/rules/', aRule.id)
      .then(response => {
        // expected: { success: true }
        if (response.success) {
          this.setState({ 'refresh': true })
          alert('The deletion succeded')
        } else {
          alert('The deletion did not succeded')
        }
      })
      .catch(err => {
        alert(err) // TODO hacer algo
      })
  }

  showList () {
    return (
      <div>
        <h2></h2>
        { this.state.rules.map((aRule, idx) =>
          <div className="panel panel-default" key={idx}>
            <div className="panel-heading">{aRule.coloquialRule}</div>
            <button
              className="btn btn-default" type="submit" onClick={() => this.deleteRule(aRule) }
            >Delete
            </button>
          </div>
        )}
      </div>
    )
  }

  render () {
    this.handleClick()
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
  onClick: PropTypes.func,
  errors: PropTypes.object
}
