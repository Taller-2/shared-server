'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'AppServers',
        'secret',
        Sequelize.STRING
      ),
      queryInterface.changeColumn(
        'AppServers',
        'name',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        }
      )
    ]
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn(
        'AppServers',
        'secret',
        Sequelize.STRING
      )]
  }
}
