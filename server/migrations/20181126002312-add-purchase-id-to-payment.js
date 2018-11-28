'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Payments',
      'purchaseID',
      Sequelize.STRING,
      { allowNull: true }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Payments',
      'purchaseID'
    )
  }
}
