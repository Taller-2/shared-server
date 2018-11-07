import React from 'react'
import Rules from '../components/rules'
import { Redirect } from 'react-router-dom'
import Http from '../service/Http'

export default class RulesContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToRules: false,
      errors: {}
    }
  }

  buildRule (rulesValues) {
    const { conditions, type, params } = rulesValues
    let rule = {
      'conditions': {
        'all': []
      },
      'event': {
        'type': type,
        'params': {
          'data': params
        }
      }
    }
    conditions.forEach((aCondition) => {
      rule.conditions.all.push({
        'fact': aCondition.fact,
        'operator': aCondition.operator,
        'value': aCondition.value
      })
    })
    return rule
  }

  handleClick (rulesValues) {
    let rule = this.buildRule(rulesValues)
    console.log('RULE: ', rule)
    Http.post('rules/', { json: JSON.stringify(rule) })
      .then(response => {
        if (response.status === 201) {
          this.setState({ redirectToRules: true })
          alert('Regla creada exitosamente')
        } else {
          let errors = {}
          response.content.forEach(e => { errors[e.param] = e.msg })
          this.setState({ errors: errors })
        }
      })
      .catch(err => {
        alert('Error al agregar la regla' + err) // TODO hacer algo
      })
  }

  render () {
    const { redirectToRules, errors } = this.state
    if (redirectToRules) {
      return <Redirect to='/rulesList' />
    }
    return (
      <Rules errors={errors} onClick={(rulesValues) => this.handleClick(rulesValues)}/>
    )
  }
}
