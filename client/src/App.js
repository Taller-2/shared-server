import React, { Component } from 'react'
import LoginContainer from './containers/LoginContainer'
import RegisterContainer from './containers/RegisterContainer'
import LoggedNavbar from './components/LoggedNavbar'
import GuestNavbar from './components/GuestNavbar'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import './App.css'
import AppServerStatus from './components/AppServerStatus'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      token: null
    }
  }

  componentDidMount () {
    this.callApi()
      .then(res => this.setState({ response: res.message }))
      .catch(err => alert(err))
  }

  async callApi () {
    const response = await fetch('/hello')
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message)

    return body
  }

  loginOk () {
    this.setState(this.state)
  }

  render () {
    const isLogged = (sessionStorage.getItem('auth') !== null)
    return (
      <React.Fragment>
        <div>
          <Router>
            <div>
              { isLogged ? <LoggedNavbar /> : <GuestNavbar/> }

              <Route path="/login"
                render={routeProps => <LoginContainer {...routeProps} onLogin={ () => this.setState(this.state) }/>} />
              <Route path="/logout"
                render={routeProps => <Logout {...routeProps} onLogout={ () => this.setState(this.state) }/>} />
              <Route path="/register" component={RegisterContainer} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/app-server-status" component={AppServerStatus} />
            </div>
          </Router>
        </div>
      </React.Fragment>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.getItem('auth') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

const Logout = (props) => {
  sessionStorage.clear()
  props.onLogout() // Hack para que se refresque la NavBar
  return <Redirect to='/' />
}

Logout.propTypes = {
  onLogout: PropTypes.func
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

export default App
