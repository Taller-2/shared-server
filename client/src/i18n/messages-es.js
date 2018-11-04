export default {
  currencies: {
    ARS: 'Pesos',
    USD: 'Dolares'
  },
  payment: {
    status: { pending: 'Pendiente', approved: 'Aprobado', rejected: 'Rechazado' },
    methods: { cash: 'Efectivo', creditCard: 'Tarjeta de Crédito' }
  },
  shipment: {
    status: { pending: 'Pendiente', shipped: 'Enviado', cancelled: 'Cancelado' }
  }
}
