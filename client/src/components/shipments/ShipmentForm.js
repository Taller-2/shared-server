import React from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Row, HelpBlock } from 'react-bootstrap'
import PropTypes from 'prop-types'
import messages from '../../i18n'

const ShipmentForm = (props) => (
  <Grid>
    <Row className="show-grid">
      <Col xs={12} md={6} mdOffset={3}>
        <h1 style={{ textAlign: 'center' }} > {props.title} </h1>
      </Col>
    </Row>

    <Row className="show-grid">
      <Col xs={12} md={6} mdOffset={3}>
        <Form horizontal>
          <FormGroup controlId="address">
            <Col componentClass={ControlLabel} sm={2}>
              Dirección
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Dirección" onChange={props.handleChange('address')}/>
              <HelpBlock>
                <p className="text-danger">{ props.errors.address
                  ? (typeof props.errors.address === 'string' ? props.errors.address : 'Este campo es requerido')
                  : '' }</p>
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="transactionId">
            <Col componentClass={ControlLabel} sm={2}>
              #
            </Col>
            <Col sm={10}>
              <FormControl type="number" placeholder="Numero de Transacción" onChange={props.handleChange('transactionId')}/>
              <HelpBlock>
                <p className="text-danger">{ props.errors.transactionId
                  ? (typeof props.errors.transactionId === 'string' ? props.errors.transactionId : 'Este campo es requerido')
                  : '' }</p>
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="status">
            <Col componentClass={ControlLabel} sm={2}>
              Estado
            </Col>
            <Col sm={10}>
              <FormControl componentClass="select" placeholder="Seleccionar" onChange={props.handleChange('status')}>
                <option value="">Seleccionar</option>
                { props.shipmentStatus.map(c => <option key={c} value={c}>{messages.shipment.status[c]}</option>) }
              </FormControl>
              <HelpBlock>
                <p className="text-danger">{ props.errors.status ? 'Este campo es requerido' : '' }</p>
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10} style={{ textAlign: 'right' }}>
              <Button style={{ marginRight: 1 + 'em' }} type="submit" onClick={ props.goBack }>
                Volver
              </Button>
              <Button type="submit" onClick={ props.submit }>
                Aceptar
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  </Grid>
)

export default ShipmentForm

ShipmentForm.propTypes = {
  errors: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  shipmentStatus: PropTypes.array.isRequired
}
