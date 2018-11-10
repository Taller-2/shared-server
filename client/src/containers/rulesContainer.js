import React from 'react'
import RulesForm from '../components/rulesForm'
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
          'data': params,
          'fact': []
        }
      }
    }
    conditions.forEach((aCondition) => {
      if (type === 'factor') {
        rule.event.params.fact.push(aCondition.fact)
      }
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
          alert('Rule created successfully')
        } else {
          if (response.content.errors.json) {
            toast(JSON.stringify(response.content.errors.json))
          } else {
            toast(JSON.stringify(response.content.errors))
          }
          this.setState({
            errors: response.content.errors,
            refresh: true
          })
        }
      })
      .catch(err => {
        toast(err)
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
        <RulesForm
          errors={errors}
          refresh={refresh}
          onClick={(rulesValues) => this.handleClick(rulesValues)}
          desactivateRefresh={() => this.desactivateRefresh()}
        />
      </div>
    )
  }
}
