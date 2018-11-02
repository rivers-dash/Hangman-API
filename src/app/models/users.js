const Sequelize = require('sequelize');

import sequelize from 'Database/hangman'

const Users = sequelize.define('users', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
	isAdmin: {
		type: Sequelize.BOOLEAN
	}
});

export default Users
