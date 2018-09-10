import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginContainer from './containers/LoginContainer'

import logo from './logo.svg'

import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { response: '' }
  }

  componentDidMount () {
    this.callApi()
      .then(res => this.setState({ response: res.message }))
      .catch(err => console.log(err))
  }

  async callApi () {
    const response = await fetch('/hello')
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message)

    return body
  };

  render () {
    return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <p className="App-intro">{this.state.response}</p>
        <LoginContainer />
      </div>
    </React.Fragment>
    )
  }
}

export default App
