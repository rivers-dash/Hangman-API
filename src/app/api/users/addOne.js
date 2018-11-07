import USers from 'Models/users'
import Joi from 'joi'

const schema = {
	username: Joi.string().min(8).max(24).required(),
	firstName: Joi.string().min(3).max(12).required(),
	lastName: Joi.string().min(3).max(12).required(),
	password: Joi.string().min(8).max(12).required(),
	//passwordCheck: Joi.string().min(8).max(12).required(),
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
		const { username } =  req.body
		Users.findOne({
			where: {
				username: username,
			},
			raw: true
		})

		.then(username => {
			if (username) {
				res.status(400).send('Username already exist')
				return null
			} else {
					next()
					return null
				}
		})

			.catch(err => {
				res.status(503).send('Error while searching expression from database')
				return null
			})
	}

function addOne(req, res) {
		Users.create(req.body)
		.then((result) => {
			res.status(200).json(result)
			return null
		})
		.catch(err => {
			res.status(503).send('Error while fetching expression from database')
			return null
		})
}

export default  {
	description: 'Adding user to database',
	type: 'post',
	path: '/user',
	handlers: [
		requestValidation,
		isExisting,
		addOne
	],
}
