export default {
  currencies: {
    ARS: 'Pesos',
    USD: 'Dolares'
  },
  payment: {
    status: {
      pending: 'Pendiente',
      approved: 'Aprobado',
      rejected: 'Rechazado'
    },
    methods: {
      cash: 'Efectivo',
      credit: 'Tarjeta de Crédito',
      debit: 'Tarjeta de Débito'
    }
  },
  shipment: {
    status: { pending: 'Pendiente', shipped: 'Enviado', cancelled: 'Cancelado' }
  }
}
