'use strict'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Users').then(function () {
			return queryInterface.createTable('Users', {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				name: {
					allowNull: false,
					type: Sequelize.STRING
				},
				email: {
					allowNull: false,
					type: Sequelize.STRING,
					unique: true
				},
				password: {
					allowNull: false,
					type: Sequelize.STRING
				},
				enabled: {
					allowNull: false,
					type: Sequelize.BOOLEAN
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE
				}
			})
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Users').then(function () {
			return queryInterface.createTable('Users', {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				name: {
					type: Sequelize.STRING
				},
				email: {
					type: Sequelize.STRING
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE
				}
			})
		})
	}
}
