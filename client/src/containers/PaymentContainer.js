import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Http from '../service/Http'
import PrivateRoute from '../components/PrivateRoute'
import PaymentForm from '../components/payments/PaymentForm'
import PaymentList from '../components/payments/PaymentList'
import PropTypes from 'prop-types'

export default class PaymentContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      match: props.match,
      redirectToLogin: false,
      payments: [],
      errors: {},
      currencyList: [{ id: 'ARS', description: 'Pesos' }, { id: 'USD', description: 'Dolares' }],
      statusDesc: { pending: 'Pendiente', approved: 'Aprobado', rejected: 'Rechazado' },
      methodsDesc: { cash: 'Efectivo', creditCard: 'Tarjeta de Crédito' },
      currencyDesc: { ARS: 'Pesos', USD: 'Dolares' }
    }
    this.getPaymentById = this.getPaymentById.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitNewPayment = this.submitNewPayment.bind(this)
    this.goBack = this.goBack.bind(this)
    this.validate = this.validate.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
  }

  fetchPayments () {
    Http.get('/payments/')
      .then(response => {
        if (response.success) {
          console.log(response.payments)
          this.setState({ payments: response.payments })
        } else {
          toast('Error buscando pagos')
        }
      })
      .catch(err => {
        console.log(err)
        toast('Error buscando pagos')
      })
  }

  componentDidMount () {
    if (this.props.match.isExact) {
      this.fetchPayments()
    }
  }

  getPaymentById () {
    let id = this.props.location.pathname.split('/').pop()
    const { payments } = this.state
    if (payments) {
      let match = payments.filter(p => p.id === id)
      return (match.length ? match[0] : null)
    }
    return null
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  validate = (obj, props) => {
    if (!props) {
      props = Object.keys(obj) // If not specified, checks all
    }
    const errors = { hasErrors: false }
    for (const key of props) {
      errors[key] = !obj[key] || obj[key].length === 0
      errors.hasErrors = errors.hasErrors || errors[key]
    }
    return errors
  }

  componentWillUnmount = () => {
    this.setState({ errors: {} })
  }

  submitNewPayment = (event) => {
    event.preventDefault()
    const payment = {
      transactionId: this.state.transactionId,
      currency: this.state.currency,
      amount: this.state.amount,
      paymentMethod: this.state.paymentMethod,
      status: this.state.status
    }
    const validation = this.validate(payment)
    if (validation.hasErrors) {
      this.setState({ errors: validation })
    } else {
      Http.post('/payments/', payment)
        .then(response => {
          if (response.status === 201) {
            toast('Pago creado exitosamente!')
            this.setState({ errors: {} })
            this.fetchPayments()
            this.goBack()
          } else {
            toast('No se pudo crear el pago')
            this.setState({ errors: response.content.errors })
          }
        })
        .catch(err => {
          console.log('Error al crear usuario' + err) // TODO hacer algo
        })
    }
  }

  goBack (event) {
    if (event) {
      event.preventDefault()
    }
    this.props.history.goBack()
  }

  updateStatus = payment => () => {
    if (payment && payment.transactionId && payment.status) {
      Http.put('/payments/' + payment.transactionId, payment)
        .then(response => {
          if (response.status === 200) {
            toast('Pago actualizado exitosamente!')
            this.setState({ payments: response.content.payments })
          } else {
            toast('No se pudo actualizar el pago')
            this.setState({ errors: response.content.errors })
          }
        })
        .catch(err => {
          console.log('Error al crear usuario' + err) // TODO hacer algo
        })
    }
  }

  render () {
    const { match, payments, errors, statusList, statusDesc, methodsDesc, currencyDesc } = this.state
    return (
      <div>
        <ToastContainer />
        <PrivateRoute exact path={ match.path } component={ PaymentList } payments={ payments } currencyDesc={currencyDesc}
          updateStatus={ this.updateStatus } statusDesc={ statusDesc } methodsDesc={ methodsDesc }/>
        <PrivateRoute exact path={ `${match.path}/new` } component={ PaymentForm } errors={errors}
          statusList={statusList} currencyDesc={currencyDesc} methodsDesc={ methodsDesc } statusDesc={ statusDesc }
          handleChange={this.handleChange} submit={this.submitNewPayment} goBack={this.goBack} title='Nuevo Pago'/>
      </div>
    )
  }
}

PaymentContainer.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool
  }),
  history: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}
