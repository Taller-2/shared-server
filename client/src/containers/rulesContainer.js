import React from 'react'
import RulesForm from '../components/rulesForm'
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

  handleClick (rulesValues) {
    const { fact, value, operator, type, params } = rulesValues
    console.log('state: ', rulesValues)
    let rule = {
      'conditions': {
        'all': [{
          'fact': fact,
          'operator': operator,
          'value': value
        }]
      },
      'event': {
        'type': type,
        'params': {
          'data': params
        }
      }
    }
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
      <RulesForm errors={errors} onClick={(rulesValues) => this.handleClick(rulesValues)}/>
    )
  }
}
