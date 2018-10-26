const Sequelize = require('sequelize');

import sequelize from 'Database/hangman'

// console.log('2 : ', sequelize)

const Expressions = sequelize.define('expressions', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
  expression: {
    type: Sequelize.STRING
  },
  clue: {
    type: Sequelize.STRING
  }
});

export default Expressions
