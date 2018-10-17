import React from 'react'
import RulesListForm from '../components/rulesListForm'

export default class RulesContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  render () {
    const { errors } = this.state
    return (
      <RulesListForm errors={errors} onClick={(rules) => this.handleClick(rules)}/>
    )
  }
}
