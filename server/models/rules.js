'use strict'
module.exports = (sequelize, DataTypes) => {
  const Rules = sequelize.define('Rules', {
    json: DataTypes.STRING
  }, {})
  Rules.associate = function (models) {
    // associations can be defined here
  }
  return Rules
}
