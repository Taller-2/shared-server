import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import Http from '../../service/Http'

export default class AppServer extends React.Component {
  constructor (props) {
    super(props)
    this.state = { ok: true }
  }

  render () {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.url}</td>
        <td>{this.state.ok ? 'OK' : 'FAILED'}</td>
        <td>
          <Button onClick={this.delete}>
            Borrar
          </Button>
        </td>
      </tr>
    )
  }

  componentDidMount () {
    this.intervalID = setInterval(this.checkStatus.bind(this), 3000)
  }

  componentWillUnmount () {
    clearInterval(this.intervalID)
  }

  checkStatus () {
    Http
      .get(this.props.url.replace(/\/$/, '') + '/ping')
      .then(response => { this.setState({ ok: response.ok }) })
      .catch(() => { this.setState({ ok: false }) })
  }

  delete = () => {
    Http
      .delete('/app-server/', this.props.id)
      .then(() => { this.props.onDelete(this.props.id) })
  }
}

AppServer.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  url: PropTypes.string,
  onDelete: PropTypes.func,
  ok: PropTypes.bool
}
