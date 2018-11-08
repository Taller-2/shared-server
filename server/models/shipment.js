'use strict'
module.exports = (sequelize, DataTypes) => {
  const Shipment = sequelize.define('Shipment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    },
    transactionId: DataTypes.STRING,
    status: DataTypes.STRING
  }, {})
  Shipment.associate = function (models) {
    // associations can be defined here
  }
  return Shipment
}
