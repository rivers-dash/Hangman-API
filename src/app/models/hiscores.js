const Sequelize = require('sequelize');
import Expressions from './expressions'
import Users from './users'

import sequelize from 'Database/hangman'

const Hiscores = sequelize.define('hiscores', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
  userId: {
    type: Sequelize.INTEGER
  },
  expressionId: {
    type: Sequelize.INTEGER
  },
	score: {
    type: Sequelize.INTEGER
  },
});

Hiscores.belongsTo(Users, {foreignKey: 'userId', targetKey: 'id'})
Hiscores.belongsTo(Expressions, {foreignKey: 'expressionId', targetKey: 'id'})

export default Hiscores
