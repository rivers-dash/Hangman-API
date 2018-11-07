import Hiscores from 'Models/hiscores'
import Users from 'Models/users'
import Expressions from 'Models/expressions'
import Sequelize from 'sequelize'

function getHiscores(req, res) {
	Hiscores.findAll({
		order: [
            ['score', 'DESC'],
        ],
		include: [
			{	model: Users, as: 'user', attributes: ['firstName', 'lastName'] },
			{	model: Expressions, as: 'expression' },
		],
    limit : 10
	})
	.then(hiscores => {
		if (hiscores) {
			setTimeout(() => { res.json(hiscores) }, 1000)
		}
		else {
			res.status(404).send('No hiscores found in database')
		}
	}).catch(err => {
		res.status(503).send('Error while getting hiscores from database')
	})
}

export default  {
	description: 'Getting hiscores from database',
	type: 'get',
	path: '/api/hiscores',
	handlers: [
		getHiscores
	],
}
