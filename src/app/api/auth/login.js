import Expressions from 'Models/expressions'
import Joi from 'joi'
import jwt from 'jsonwebtoken'

const schema = {
	id: Joi.number().integer().min(1).required(),
	username: Joi.string().min(3).max(25).required(),
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

function login(req, res) {
	const { user } = req.body
	jwt.sign({ user: user }, 'secretkey', { expiresIn: '300000s' } , (err, token) => {
		res.json({
			token: token
		})
	})
}

export default  {
	description: 'Login to the API',
	type: 'post',
	path: '/api/login',
	handlers: [
		requestValidation,
		login
	],
}
