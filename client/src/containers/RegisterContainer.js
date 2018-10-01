import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { Redirect } from 'react-router-dom'
import Http from '../service/Http'

export default class RegisterContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToLogin: false,
      errors: {}
    }
  }

  handleClick (name, email, pass, passConfirmation) {
    if (pass.localeCompare(passConfirmation)) {
      this.setState({ errors: { passConfirmation: 'Las contraseñas no coinciden' } })
    } else {
      Http.post('user/', { name, email, pass })
        .then(response => {
          if (response.status === 201) {
            alert('Usuario creado exitosamente!')
            this.setState({ redirectToLogin: true })
          } else {
            let errors = {}
            console.log(response)
            response.content.forEach(e => { errors[e.param] = e.msg })
            this.setState({ errors: errors })
          }
        })
        .catch(err => {
          alert('Error al crear usuario' + err) // TODO hacer algo
        })
    }
  }

  render () {
    const { redirectToLogin, errors } = this.state
    console.log(errors)
    if (redirectToLogin) {
      return <Redirect to='/' />
    }

    return (
      <RegisterForm errors={errors} onClick={(name, email, pass, passConfirmation) => this.handleClick(name, email, pass, passConfirmation)} />
    )
  }
}
