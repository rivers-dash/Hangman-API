const Sequelize = require('sequelize');

module.exports = new Sequelize('hangman', 'postgres', 'bknord', {
  host: 'localhost',
  dialect: 'postgres',
	define: {
  	timestamps: false
  },
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});




// const Sequelize = require('sequelize');
//
// module.exports = new Sequelize('hangman', 'postgres', 'bknord', {
//   host: 'localhost',
//   dialect: 'postgres',
// 	define: {
//   	timestamps: false
//   },
//   operatorsAliases: false,
//
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
// });
