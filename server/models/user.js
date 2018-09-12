'use strict'
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		enabled: DataTypes.BOOLEAN
	}, {})
	User.associate = function (models) {
	// associations can be defined here
	}
	return User
}
