import React from 'react'
import moment from 'moment'
import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import messages from '../../i18n'

const ShipmentList = (props) => (
  <div style={{ width: '80%', margin: 'auto' }}>
    <div>
      <Link to={`${props.path}/new`}>
        <Button type="button">
          Nuevo Envío
        </Button>
      </Link>
    </div>
    <Table responsive>
      <thead>
        <tr>
          <th># Transacción</th>
          <th>Dirección</th>
          <th>Fecha creación</th>
          <th>Fecha modificación</th>
          <th>Estado</th>
          <th>Cambiar Estado</th>
        </tr>
      </thead>
      <tbody>
        { props.shipments.map(shipment => (
          <tr key={shipment.id}>
            <td>{ shipment.transactionId }</td>
            <td>{ shipment.address }</td>
            <td>{ moment(shipment.createdAt).format('DD/MM/YYYY hh:mm:ss') }</td>
            <td>{ moment(shipment.updatedAt).format('DD/MM/YYYY hh:mm:ss') }</td>
            <td>{ messages.shipment.status[shipment.status] }</td>
            <td>
              { shipment.status === 'pending' ? (
                <ButtonToolbar>
                  <Button bsStyle="danger" bsSize="xsmall" onClick={ props.updateStatus({ id: shipment.id, status: 'cancelled' }) }>
                    Cancelado
                  </Button>
                  <Button bsStyle="success" bsSize="xsmall" onClick={ props.updateStatus({ id: shipment.id, status: 'shipped' }) }>
                    Enviado
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

export default ShipmentList

ShipmentList.propTypes = {
  shipments: PropTypes.array,
  path: PropTypes.string,
  updateStatus: PropTypes.func.isRequired
}
