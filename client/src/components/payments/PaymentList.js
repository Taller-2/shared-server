import React from 'react'
import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const PaymentList = (props) => (
  <div style={{ width: '80%', margin: 'auto' }}>
    <div>
      <Link to={`${props.path}/new`}>
        <Button type="button">
          Nuevo Pago
        </Button>
      </Link>
    </div>
    <Table responsive>
      <thead>
        <tr>
          <th># Transacción</th>
          <th>Moneda</th>
          <th>Monto</th>
          <th>Metodo de pago</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        { props.payments.map(p => (
          <tr key={p.id}>
            <td>{ p.transactionId }</td>
            <td>{ props.statusDesc[p.currency] }</td>
            <td>{ p.amount }</td>
            <td>{ props.methodsDesc[p.paymentMethod] }</td>
            <td>{ props.statusDesc[p.status] }</td>
            <td>
              { p.status === 'pending' ? (
                <ButtonToolbar>
                  <Button bsStyle="danger" bsSize="xsmall" onClick={ props.updateStatus({ transactionId: p.transactionId, status: 'rejected' }) }>
                    Rechazar
                  </Button>
                  <Button bsStyle="success" bsSize="xsmall" onClick={ props.updateStatus({ transactionId: p.transactionId, status: 'approved' }) }>
                    Aprobar
                  </Button>
                </ButtonToolbar>
              ) : ''
              }
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

export default PaymentList

PaymentList.propTypes = {
  payments: PropTypes.array,
  path: PropTypes.string,
  updateStatus: PropTypes.func.isRequired,
  currencyDesc: PropTypes.object,
  statusDesc: PropTypes.object.isRequired,
  methodsDesc: PropTypes.object.isRequired
}
