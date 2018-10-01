import React from 'react'
import Http from '../../service/Http'
import AppServer from './AppServer'
import { Grid, Table } from 'react-bootstrap'
import AddAppServerForm from './AddAppServerForm'

export default class AppServerStatus extends React.Component {
  constructor (props) {
    super(props)
    console.log('constructor AppServerStatus')
    this.state = { appServers: [] }
  }

  render () {
    console.log('render')
    console.log(this.state)
    return (
      <Grid>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>URL</th>
              <th>Estado</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            {this.state.appServers.map((server, index) => {
              return (
                <AppServer
                  key={index}
                  name={server.name}
                  url={server.url}
                  id={server.id}
                  onDelete={ this.onDeleteServer.bind(this) }
                />
              )
            })}
          </tbody>
        </Table>
        <AddAppServerForm
          onAdd={ this.onAddServer.bind(this) }
        />
      </Grid>
    )
  }

  componentDidMount () {
    Http
      .get('/app-server/')
      .then(response => {
        if (response.servers) {
          this.setState({ appServers: response.servers })
        } else {
          alert('error cargar los app-servers :(') //TODO manejar errores apropiadamente
        }
      })
  }

  onDeleteServer (id) {
    this.setState({
      appServers: this.state.appServers.filter((server) => server.id !== id)
    })
  }

  onAddServer (server) {
    this.setState({
      appServers: this.state.appServers.concat([server])
    })
  }
}
