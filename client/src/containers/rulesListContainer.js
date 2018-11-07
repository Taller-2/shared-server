import React from 'react'
import RulesList from '../components/rulesList'
import Http from '../service/Http'
import RuleTranslator from '../service/ruleTranslator'

export default class RulesContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {},
      refresh: false,
      rules: [{
        'rule': [],
        'coloquialRule': '',
        'id': ''
      }]
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  getRules = () => {
    if (this.state.refresh) return
    let rulesVector = []
    Http.get('/rules/')
      .then(response => {
        // expected: { success: true, rules: rules }
        if (response.success) {
          const length = response.rules.length
          for (let i = 0; i < length; i++) {
            const aRule = response.rules[i].json
            const translatedRule = RuleTranslator.translateRule(aRule)
            const id = response.rules[i].id
            rulesVector.push(
              {
                'rule': aRule,
                'coloquialRule': translatedRule,
                'id': id
              })
          }
          this.handleChange('rules', rulesVector)
          this.handleChange('refresh', true)
        } else {
          alert('Error: 200 status was not received')
        }
      })
      .catch(err => {
        alert(err)
      })
  }

  deleteRule = (aRule) => {
    Http.delete('/rules/', aRule.id)
      .then(response => {
        // expected: { success: true }
        if (response.success) {
          this.setState({ 'refresh': true })
          alert('The deletion succeed')
        } else {
          alert('The deletion did not succeed')
        }
      })
      .catch(err => {
        alert(err)
      })
  }

  render () {
    const { errors, rules } = this.state
    return (
      <RulesList
        errors={errors}
        rules={rules}
        getRules={(rules) => this.getRules(rules)}
        deleteRule={(aRule => this.deleteRule(aRule))}
      />
    )
  }
}
