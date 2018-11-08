import Scores from 'Models/scores'
import Users from 'Models/users'
import Expressions from 'Models/expressions'
import Sequelize from 'sequelize'

function getScores(req, res) {
	Scores.findAll({
		order: [
            ['score', 'DESC'],
        ],
		include: [
			{	model: Users, as: 'user', attributes: ['firstName', 'lastName'] },
			{	model: Expressions, as: 'expression' },
		],
    limit : 10
	})
	.then(scores => {
		if (scores) {
			setTimeout(() => { res.json(scores) }, 1000)
		}
		else {
			res.status(404).send('No scores found in database')
		}
	}).catch(err => {
		res.status(503).send('Error while getting scores from database')
	})
}

export default  {
	description: 'Getting scores from database',
	type: 'get',
	path: '/api/scores',
	handlers: [
		getScores
	],
}
