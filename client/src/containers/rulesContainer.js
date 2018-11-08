import React from 'react'
import Rules from '../components/rules'
import { Redirect } from 'react-router-dom'
import Http from '../service/Http'
import httpStatus from 'http-status-codes'
import { ToastContainer, toast } from 'react-toastify'

export default class RulesContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToRules: false,
      errors: {},
      refresh: false
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
    Http.post('rules/', { json: JSON.stringify(rule) })
      .then(response => {
        if (response.status === httpStatus.CREATED) {
          this.setState({ redirectToRules: true })
          alert('Regla creada exitosamente')
        } else {
          toast('ERROR: DO NO LEAVE A RULE EMPTY')
          this.setState({
            errors: response.content.error,
            refresh: true
          })
        }
      })
      .catch(err => {
        alert('Error al agregar la regla' + err) // TODO hacer algo
      })
  }

  desactivateRefresh () {
    this.setState({
      refresh: false
    })
  }

  render () {
    const { redirectToRules, errors, refresh } = this.state
    if (redirectToRules) {
      return <Redirect to='/rulesList' />
    }
    return (
      <div>
        <ToastContainer></ToastContainer>
        <Rules
          errors={errors}
          refresh={refresh}
          onClick={(rulesValues) => this.handleClick(rulesValues)}
          desactivateRefresh={() => this.desactivateRefresh()}
        />
      </div>
    )
  }
}
