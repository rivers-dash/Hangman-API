import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Users from 'Models/users'

const usersCtrl = {
	register: function(req, res) {
		// params
		let { email, username, password, bio } = req.body
		if (!email || !username || !password)
			return res.status(400).json({ 'error': 'missing parameters'})

		// verifier les variables

		Users.findOne({
			attributes: 'email',
			where: { email: email }
		})
		.then((res) => {
			if (!res) {
				bcryptjs.hash(password, 5, function(err, bcryptedPassword) {
					let newUser = Users.create({
						email: email,
						username: username,
						password: bcryptedPassword,
						bio: bio,
						isAdmin: false
					})
					.then((res) => {
						return res.status(201).json({ 'userId': res.id })
					})
					.catch((err) => {
						return res.status(500).json({ 'error': 'cannot add user' })
					})
				})
			} else {
				return res.status(409).json({ 'error': 'user already exist'})
			}
		})
		.catch((err) => {
			return res.status(500).json({ 'error': 'unable to verify user'})
		})
	},

	login: function(req, res) {
	}
}

export default usersCtrl
