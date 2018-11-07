import Users from 'Models/users'
import Joi from 'joi'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const schema = {
	username: Joi.string().min(8).max(24).required(),
	firstName: Joi.string().min(3).max(12).required(),
	lastName: Joi.string().min(3).max(12).required(),
	password: Joi.string().min(8).max(12).required(),
}

function requestValidation(req, res, next) {
	console.log(req.body)
	Joi.validate(req.body, schema, function (err, value) {
		if (err) {
			res.status(404).json(err)
		} else {
			next()
		}
	})
}

function signin(req, res) {
	const { username, password } = req.body
	Users.findOne({
		where: {
			username: username
		},
		raw: true
	})
	.then((user) => {
		if(user) {
			res.status(400).json({ 'error': 'Username already exist in database' })
		} else {
			bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(password, salt, function(err, hash) {
		    	req.body.password = hash
					Users.create(req.body)
					.then((user) => {
						res.status(201).send(user)
						return null
					})
					.catch((err) => {
						res.status(503).json({ 'error': 'Error searching user in database' })
						return null
					})
		    })
			})
		 }
		 return null
	})
	.catch((err) => {
		res.status(503).json({ 'error': 'Error while searching user in database' })
		return null
	})
}

export default  {
	description: 'Signin to the API',
	type: 'post',
	path: '/api/signin',
	handlers: [
		requestValidation,
		signin
	],
}
