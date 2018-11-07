import Expressions from 'Models/expressions'
import Sequelize from 'sequelize'

function getOne(req, res) {
	Expressions.findOne({
  	order: [
    	Sequelize.fn('RANDOM'),
  	]
	})
	.then(expressions => {
		if (expressions) {
			setTimeout(() => { res.json(expressions) }, 1000)

		}
		else {
			res.status(404).send('No expression coressponding to the generated rand id found in database')
		}
	}).catch(err => {
		res.status(503).send('Error while getting expression from database=')
	})
}


export default  {
	description: 'Getting an expression by id from database',
	type: 'get',
	path: '/api/expression',
	handlers: [
		getOne
	],
}
