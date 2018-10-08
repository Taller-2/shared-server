'use strict'
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    transactionId: DataTypes.STRING,
    currency: DataTypes.STRING,
    value: DataTypes.FLOAT,
    paymentMethod: DataTypes.STRING,
    status: DataTypes.STRING
  }, {})
  Payment.associate = function (models) {
    // associations can be defined here
  }
  return Payment
}
