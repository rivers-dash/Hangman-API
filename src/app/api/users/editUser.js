import Users from 'Models/users'
import Joi from 'joi'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const schema = {
	id: Joi.number().required(),
	username: Joi.string().min(8).max(24),
	firstName: Joi.string().min(3).max(12),
	lastName: Joi.string().min(3).max(12),
	currentPassword: Joi.string().min(8).max(24).required(),
	newPassword: Joi.string().min(8).max(24),
	isAdmin: Joi.boolean(),
}

function requestValidation(req, res, next) {
	Joi.validate(req.body, schema, function (err, value) {
		if (err) {
			res.status(404).json(err)
		} else {
			if (req.username) {
				Users.findOne({
					where: {
						username: username,
					},
					raw: true
				})
				.then((user) => {
					if(!user){
						next()
						return null
					} else {
						res.status(404).json({ 'error': 'Username already exist' })
					}
				})
				.catch((err) => {
					res.status(503).json({ 'error': 'Error while searhing for similar username in database' })
					return null
				})
			}
			next()
		}
	})
}

function checkcurrentPassword(req, res, next) {
	const { id, currentPassword } = req.body
	Users.findOne({
		where: {
			id: id,
		},
		raw: true
	})
	.then((user) => {
		if(!user) {
			res.status(400).json({ 'error': 'Cant find username in database' })
		} else {
			bcrypt.compare(currentPassword, user.password)
			.then((match) => {
				if(!match) {
					res.status(400).json({ 'error': 'Bad password' })
				} else {
					next()
					return null
				}
			})
			.catch((err) => {
				res.status(503).json({ 'error': 'Error while crypting passwords' })
				return null
			})
		}
	})
	.catch((err) => {
		res.status(503).json({ 'error': 'Error while fetching credentials from database' })
		return null
	})
}

function updateUser(req, res, next) {
	const { id, username, firstName, lastName, newPassword, isAdmin } = req.body
	let user = {}
	if(username) {
		user.username = username
	}
	if(firstName) {
		user.firstName = firstName
	}
	if(lastName) {
		user.lastName = lastName
	}
	if (newPassword) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(newPassword, salt, function(err, hash) {
				user.password = hash
			})
		})
	}
	if(typeof isAdmin !== 'undefined') {
		user.isAdmin = isAdmin
	}

	Users.update(user, {
		where: {
			id: id
		}
	})
	.then(() => {
		Users.findOne({ where: { id: id },
			raw: true
		})
		.then((user) => {
			req.user = user
			next()
			return null
		})
		.catch((err) => {
			res.status(503).json({ 'error': 'Error while fetching updated user in database' })
			return null
		})
		return null
	})
	.catch((err) => {
		res.status(503).json({ 'error': 'Error while updating user in database' })
		return null
	})
}

function reLogin(req, res) {
	jwt.sign({ user: req.user }, process.env.DEV_PRIVATE_KEY, { expiresIn: '1h' } , (err, token) => {
		res.cookie('login', token, { maxAge: 1000 * 60 * 10, httpOnly: false })
		delete req.user.password
		res.json({
			token: token,
			user: req.user
		})
	})
}

export default  {
	description: 'Edit user',
	type: 'post',
	path: '/api/editOne',
	handlers: [
		requestValidation,
		checkcurrentPassword,
		updateUser,
		reLogin
	],
}
