'use strict'
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    transactionId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    currency: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    paymentMethod: DataTypes.STRING,
    status: DataTypes.STRING,
    purchaseID: DataTypes.STRING
  }, {})
  Payment.associate = function (models) {
    // associations can be defined here
  }
  return Payment
}
