import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
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
            toast('Usuario creado exitosamente!')
            this.setState({ redirectToLogin: true })
          } else {
            toast('No se pudo crear el usuario, por favor verifique los datos')
            this.setState({ errors: response.content.errors })
          }
        })
        .catch(err => {
          toast('Error al crear usuario' + err) // TODO hacer algo
        })
    }
  }

  render () {
    const { redirectToLogin, errors } = this.state
    if (redirectToLogin) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <ToastContainer></ToastContainer>
        <RegisterForm errors={errors} onClick={(name, email, pass, passConfirmation) => this.handleClick(name, email, pass, passConfirmation)} />
      </div>
    )
  }
}
