import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import Http from '../service/Http'
import PrivateRoute from '../components/PrivateRoute'
import ShipmentForm from '../components/shipments/ShipmentForm'
import ShipmentList from '../components/shipments/ShipmentList'

export default class ShipmentContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      match: props.match,
      redirectToLogin: false,
      shipments: [],
      errors: {},
      shipmentStatus: []
    }
    this.fetchShipments = this.fetchShipments.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitNewShipment = this.submitNewShipment.bind(this)
    this.goBack = this.goBack.bind(this)
    this.validate = this.validate.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.fetchEnums = this.fetchEnums.bind(this)
  }

  fetchShipments () {
    Http.get('/shipments/')
      .then(response => {
        if (response.success) {
          this.setState({ shipments: response.shipments })
        } else {
          toast('Error buscando envíos')
        }
      })
      .catch(err => {
        console.log(err)
        toast('Error buscando envíos')
      })
  }

  fetchEnums () {
    Http.get('/shipments/ui-enums/')
      .then(response => {
        if (response.success) {
          this.setState({
            shipmentStatus: response.shipmentStatus
          })
        } else {
          toast('Ocurrió un error al conectarse con el servidor')
          setTimeout(() => this.fetchEnums, 10000)
        }
      })
      .catch(err => {
        console.log(err)
        toast('Ocurrió un error al conectarse con el servidor')
      })
  }

  componentDidMount () {
    this.fetchShipments()
    this.fetchEnums()
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

  submitNewShipment = (event) => {
    event.preventDefault()
    const shipment = {
      transactionId: this.state.transactionId,
      address: this.state.address,
      status: this.state.status
    }
    const validation = this.validate(shipment)
    if (validation.hasErrors) {
      this.setState({ errors: validation })
    } else {
      Http.post('/shipments/', shipment)
        .then(response => {
          if (response.status === 201) {
            toast('Envío creado exitosamente!')
            this.setState({ errors: {} })
            this.fetchShipments()
            this.goBack()
          } else {
            toast('No se pudo crear el Envío')
            this.setState({ errors: response.content.errors })
          }
        })
        .catch(err => {
          console.log(err)
          toast('No se pudo actualizar el Envío')
        })
    }
  }

  goBack (event) {
    if (event) {
      event.preventDefault()
    }
    this.props.history.goBack()
  }

  updateStatus = shipment => () => {
    if (shipment && shipment.id && shipment.status) {
      Http.put('/shipments/' + shipment.id, shipment)
        .then(response => {
          if (response.status === 200) {
            toast('Envío actualizado exitosamente!')
            this.setState({ shipments: response.content.shipments })
          } else {
            if (response.content && response.content.error && response.content.error.id) {
              toast(response.content.error.id)
              this.setState({ errors: response.content.errors.id })
            } else {
              toast('No se pudo actualizar el envío')
            }
          }
        })
        .catch(err => {
          console.log(err)
          toast('No se pudo actualizar el envío')
        })
    }
  }

  render () {
    const { match, shipments, errors, shipmentStatus } = this.state
    return (
      <div>
        <ToastContainer />
        <PrivateRoute exact path={ match.path } component={ ShipmentList } shipments={ shipments }
          updateStatus={ this.updateStatus }/>
        <PrivateRoute exact path={ `${match.path}/new` } component={ ShipmentForm } errors={errors}
          shipmentStatus={shipmentStatus} handleChange={this.handleChange} submit={this.submitNewShipment}
          goBack={this.goBack} title='Nuevo Envío'/>
      </div>
    )
  }
}

ShipmentContainer.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool
  }),
  history: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}
