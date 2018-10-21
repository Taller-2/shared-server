import React from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Row, HelpBlock } from 'react-bootstrap'
import PropTypes from 'prop-types'

const PaymentForm = (props) => (
  <Grid>
    <Row className="show-grid">
      <Col xs={12} md={6} mdOffset={3}>
        <h1 style={{ textAlign: 'center' }} > {props.title} </h1>
      </Col>
    </Row>

    <Row className="show-grid">
      <Col xs={12} md={6} mdOffset={3}>
        <Form horizontal>
          <FormGroup controlId="transactionId">
            <Col componentClass={ControlLabel} sm={2}>
              #
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Numero de Transacción" onChange={props.handleChange('transactionId')}/>
              <HelpBlock>
                <p className="text-danger">{ props.errors.transactionId ? 'Este campo es requerido' : '' }</p>
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="currency">
            <Col componentClass={ControlLabel} sm={2}>
              Moneda
            </Col>
            <Col sm={10}>
              <FormControl componentClass="select" placeholder="Seleccionar" onChange={props.handleChange('currency')}>
                <option value="">Seleccionar</option>
                { props.currencyList.map(c => <option key={c.id} value={c.id}>{c.description}</option>) }
              </FormControl>
              <HelpBlock>
                <p className="text-danger">{ props.errors.currency ? 'Este campo es requerido' : '' }</p>
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="amount">
            <Col componentClass={ControlLabel} sm={2}>
              Monto
            </Col>
            <Col sm={10}>
              <FormControl type="number" placeholder="Monto" onChange={props.handleChange('amount')}/>
              <HelpBlock>
                <p className="text-danger">{ props.errors.amount ? 'Este campo es requerido' : '' }</p>
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="paymentMethod">
            <Col componentClass={ControlLabel} sm={2}>
              Metodo de pago
            </Col>
            <Col sm={10}>
              <FormControl componentClass="select" placeholder="Seleccionar" onChange={props.handleChange('paymentMethod')}>
                <option value="">Seleccionar</option>
                { props.paymentMethodList.map(p => <option key={p.id} value={p.id}>{p.description}</option>) }
              </FormControl>
              <HelpBlock>
                <p className="text-danger">{ props.errors.paymentMethod ? 'Este campo es requerido' : '' }</p>
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
                { props.statusList.map(s => <option key={s.id} value={s.id}>{s.description}</option>) }
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

export default PaymentForm

PaymentForm.propTypes = {
  onClick: PropTypes.func,
  errors: PropTypes.object,
  statusList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired,
  paymentMethodList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired,
  currencyList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  title: PropTypes.string
}
