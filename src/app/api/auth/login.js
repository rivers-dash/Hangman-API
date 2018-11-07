import Users from 'Models/users'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import jwtDecode from 'jwt-decode'

const schema = {
	username: Joi.string().min(3).max(25).required(),
	password: Joi.string().min(8).max(40).required(),
}

function alreadyLogged(req, res, next) {
	if(typeof req.cookies.login == 'undefined') {
		next()
	} else {
		jwt.verify(req.cookies.login, process.env.DEV_PRIVATE_KEY, function(err, decoded) {
		  if(err) {
				next()
			} else if (decoded) {
				res.json({
					token: req.cookies.login,
					user: jwtDecode(req.cookies.login).user
				})
			}
		})
	}
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
							req.body.firstName = user.firstName
							req.body.lastName = user.lastName
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
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		isAdmin: req.body.isAdmin
	}

	jwt.sign({ user: user }, process.env.DEV_PRIVATE_KEY, { expiresIn: '1h' } , (err, token) => {
		res.cookie('login', token, { maxAge: 1000 * 60 * 10, httpOnly: false })
		res.json({
			token: token,
			user: user
		})
	})
}

export default  {
	description: 'Login to the API',
	type: 'post',
	path: '/api/login',
	handlers: [
		alreadyLogged,
		requestValidation,
		login
	],
}
