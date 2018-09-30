import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { Redirect } from 'react-router-dom'
import Http from '../service/Http'

export default class RegisterContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectToLogin: false
    }
  }

  handleClick (name, email, pass) {
    Http.post('user/', { name, email, pass })
      .then(response => {
        if (response.status === 201) {
          alert('usuario creado exitosamente')
          this.setState({ redirectToLogin: true })
        } else {
          alert('Error al crear usuario') // TODO hacer algo
        }
      })
      .catch(err => {
        alert('Error al crear usuario' + err) // TODO hacer algo
      })
  }

  render () {
    const { redirectToLogin } = this.state

    if (redirectToLogin) {
      return <Redirect to='/' />
    }

    return (
      <RegisterForm onClick={(name, email, pass) => this.handleClick(name, email, pass)} />
    )
  }
}
