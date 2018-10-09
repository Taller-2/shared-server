import React from 'react'
import RegisterForm from '../components/rulesForm'
// import { Redirect } from 'react-router-dom'
import Http from '../service/Http'

export default class RulesContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  handleClick (name, condition, consequence) {
    Http.post('rules/', { name, condition, consequence })
      .then(response => {
        if (response.status === 201) {
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
    return (
      <RegisterForm errors={this.state.errors} onClick={(name, condition, consequence) => this.handleClick(name, condition, consequence)} />
    )
  }
}
