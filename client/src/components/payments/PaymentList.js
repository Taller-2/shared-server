import React from 'react'
import { Button, ButtonToolbar, Table } from 'react-bootstrap'
import PropTypes from 'prop-types'
import messages from '../../i18n'

const PaymentList = (props) => (
  <div style={{ width: '80%', margin: 'auto' }}>
    <Table responsive>
      <thead>
        <tr>
          <th># Transacción</th>
          <th>ID de compra</th>
          <th>Monto</th>
          <th>Metodo de pago</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        { props.payments.map(p => (
          <tr key={p.transactionId}>
            <td>{ p.transactionId }</td>
            <td>{p.purchaseID}</td>
            <td>{ p.amount }</td>
            <td>{ messages.payment.methods[p.paymentMethod] }</td>
            <td>{ messages.payment.status[p.status] }</td>
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
  updateStatus: PropTypes.func.isRequired
}
