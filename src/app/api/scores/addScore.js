import Scores from 'Models/scores'
import Users from 'Models/users'
import Expressions from 'Models/expressions'
import Sequelize from 'sequelize'
import Joi from 'joi'

const schema = {
	userId: Joi.number().required(),
	expressionId: Joi.number().required(),
	score: Joi.number().required(),
}

function requestValidation(req, res, next) {
	console.log(req.body)
	const { userId, expressionId, score } = req.body
	Joi.validate(req.body, schema, function (err, value) {
		if (err) {
			res.status(404).json(err)
		} else {
			Users.findOne({ where : { id: userId } })
			.then((user) => {
				if(!user) {
					res.status(404).json({ 'error': 'Username don\'t exist in database' })
				} else {
					Expressions.findOne({ where : { id: expressionId } })
					.then((expression) => {
						if(!expression) {
							res.status(404).json({ 'error': 'Expression don\'t exist in database' })
						} else {
							next()
							return null
						}
					})
					.catch((err) => {
						res.status(503).send('Error while searching userId in database')
					})
				}
				return null
			})
			.catch((err) => {
				res.status(503).send('Error while searching userId in database')
				return null
			})

		}
	})
}

function addScore(req, res) {
	Scores.create(req.body)
	.then(result => {
		setTimeout(() => { res.json(result) }, 1000)
		return null
	})
	.catch(err => {
		res.status(503).json({ 'error': 'Error while adding score to database', 'err': err })
		return null
	})
}

export default  {
	description: 'Add score to database',
	type: 'post',
	path: '/api/scores',
	handlers: [
		requestValidation,
		addScore
	],
}
