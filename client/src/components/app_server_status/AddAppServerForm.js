import React from 'react'
import { Button, Col, FormControl, Grid, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Http from '../../service/Http'

export default class AddAppServerForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      enabled: false,
      name: '',
      url: ''
    }
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col md={5}>
            <FormControl
              type="text"
              placeholder="Nombre"
              onChange={this.handleChange('name')}
              value={this.state.name}
            />
          </Col>
          <Col md={5}>
            <FormControl
              type="text"
              placeholder="URL"
              onChange={this.handleChange('url')}
              value={this.state.url}
            />
          </Col>
          <Col md={2}>
            <Button
              type="button"
              onClick={ this.submit.bind(this) }
              disabled={!this.state.enabled}>
              Agregar servidor
            </Button>
          </Col>
        </Row>
      </Grid>
    )
  }

  handleChange = name => event => {
    this.setState(
      { [name]: event.target.value },
      () => this.setState({ enabled: this.state.name && this.state.url })
    )
  }

  submit () {
    Http.post('/app-server/', this.state).then((response) => {
      this.props.onAdd(response.content.server)
      this.setState({ name: '', url: '' })
    })
  }
}

AddAppServerForm.propTypes = {
  onAdd: PropTypes.func
}
