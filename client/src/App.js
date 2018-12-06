import React, { Component } from 'react'
import LoginContainer from './containers/LoginContainer'
import RegisterContainer from './containers/RegisterContainer'
import LoggedNavbar from './components/LoggedNavbar'
import GuestNavbar from './components/GuestNavbar'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Auth from './service/Auth'
import 'react-toastify/dist/ReactToastify.css'

import './App.css'
import AppServerStatus from './components/app_server_status/AppServerStatus'
import PrivateRoute from './components/PrivateRoute'
import RulesContainer from './containers/rulesContainer'
import RulesListContainer from './containers/rulesListContainer'
import AppServerGraphsContainer from './containers/appServerGraphsContainer'
import PaymentsContainer from './containers/PaymentContainer'
import ShipmentsContainer from './containers/ShipmentsContainer'
import ShipmentsCostContainer from './containers/shipmentCostContainer'

class App extends Component {
  constructor (props) {
    super(props)
    Auth.setApp(this)
    this.state = {
      user: null,
      token: null
    }
  }

  loginOk () {
    this.setState(this.state)
  }

  render () {
    return (
      <React.Fragment>
        <div>
          <Router>
            <div>
              { Auth.isLogged() ? <LoggedNavbar /> : <GuestNavbar/> }

              <Route path="/login"
                render={routeProps => <LoginContainer {...routeProps} onLogin={ () => this.setState(this.state) }/>} />
              <Route path="/logout"
                render={routeProps => <Logout {...routeProps} onLogout={ () => this.setState(this.state) }/>} />
              <Route path="/register" component={RegisterContainer} />
              <PrivateRoute exact path="/" component={AppServerStatus} />
              <PrivateRoute path="/addRules" component={RulesContainer} />
              <PrivateRoute path="/rulesList" component={RulesListContainer} />
              <PrivateRoute path="/appServerGraphs" component={AppServerGraphsContainer} />
              <PrivateRoute path="/payments" component={PaymentsContainer} />
              <PrivateRoute path="/shipments" component={ShipmentsContainer} />
              <PrivateRoute path="/shipment-cost" component={ShipmentsCostContainer} />
            </div>
          </Router>
        </div>
      </React.Fragment>
    )
  }
}

const Logout = (props) => {
  Auth.logout()
  props.onLogout() // Hack para que se refresque la NavBar
  return <Redirect to='/' />
}

Logout.propTypes = {
  onLogout: PropTypes.func
}

export default App
