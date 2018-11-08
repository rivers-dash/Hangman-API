const Sequelize = require('sequelize');
import Expressions from './expressions'
import Users from './users'

import sequelize from 'Database/hangman'

const Scores = sequelize.define('scores', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
  userId: {
    type: Sequelize.INTEGER,
  },
  expressionId: {
    type: Sequelize.INTEGER,
  },
	score: {
    type: Sequelize.INTEGER
  },
});

Scores.belongsTo(Users, {foreignKey: 'userId', targetKey: 'id'})
Scores.belongsTo(Expressions, {foreignKey: 'expressionId', targetKey: 'id'})

export default Scores
