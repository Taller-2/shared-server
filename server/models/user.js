'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN
  }, {})
  User.associate = function () {
  // associations can be defined here
  }
  User.findByEmail = email => {
    return User.findOne({
      where: {
        email: email
      },
      raw: true
    })
  }
  return User
}
