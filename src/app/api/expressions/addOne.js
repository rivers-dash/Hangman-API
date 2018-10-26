import Expressions from 'Models/expressions'
import Joi from 'joi'

const schema = {
	expression: Joi.string().min(8).max(45).required(),
	clue: Joi.string().min(3).max(12).required(),
}

function requestValidation(req, res, next) {
	Joi.validate(req.body, schema, function (err, value) {
		if (err) {
			res.status(404).json(err)
		} else {
			next()
		}
	})
}

function isExisting(req, res, next) {
		Joi.validate({ expression: 'a string' }, schema, function (err, value) { });
		const { expression, clue } =  req.body

		Expressions.findOne({
			where: {
				expression: expression,
			},
			raw: true
		})

		.then(expressions => {
			if (expressions) {
				res.status(400).send('Expression already exists in databese')
				return null
			} else
					next()
		})

			.catch(err => {
				res.status(503).send('Error while searching expression from database')
				return null
			})
	}

function addOne(req, res) {
		Expressions.create(req.body)
		.then((result) => {
			res.status(400).json(result)
			return null
		})
		.catch(err => {
			res.status(503).send('Error while searching expression from database')
			return null
		})
}

export default  {
	description: 'Adding expression to database',
	type: 'post',
	path: '/expression',
	handlers: [
		requestValidation,
		isExisting,
		addOne
	],
}
