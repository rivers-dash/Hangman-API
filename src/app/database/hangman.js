import Sequelize from 'sequelize'

import { db } from 'Configuration/config'

const { database, username, password } = db

const sequelize = new Sequelize(database, username, password, {
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
})

// console.log(sequelize)

export default sequelize
