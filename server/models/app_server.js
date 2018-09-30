'use strict'
module.exports = (sequelize, DataTypes) => {
  const AppServer = sequelize.define('AppServer', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {})
  AppServer.associate = function (models) {
    // associations can be defined here
  }
  return AppServer
}
