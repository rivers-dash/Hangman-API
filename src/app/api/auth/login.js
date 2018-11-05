import Users from 'Models/users'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const schema = {
	username: Joi.string().min(3).max(25).required(),
	password: Joi.string().min(8).max(40).required(),
}

function requestValidation(req, res, next) {
	const { username, password } = req.body
	Joi.validate(req.body, schema, function (err, value) {
		if (err) {
			res.status(404).json(err)
		} else {
			Users.findOne({
				where: {
					username: username,
				},
				raw: true
			})
			.then((user) => {
				if(!user) {
					res.status(400).json({ 'error': 'Bad username' })
				} else {
					bcrypt.compare(password, user.password)
					.then((match) => {
						if(!match) {
							res.status(400).json({ 'error': 'Bad password' })
						} else {
							req.body.id = user.id
							next()
							return null
						}
					})
					.catch((err) => {
						res.status(503).send('Error while fetching credentials from database')
						return null
					})
				}
			})
			.catch((err) => {
				res.status(503).send('Error while fetching credentials from database')
				return null
			})

		}
	})
}

function login(req, res) {
	const user = {
		id: req.body.id,
		username: req.body.username,
		isAdmin: req.body.isAdmin
	}

	jwt.sign({ user: user }, process.env.DEV_PRIVATE_KEY, { expiresIn: '1h' } , (err, token) => {
		res.cookie('login', token)
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
