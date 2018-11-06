import Users from 'Models/users'
import Joi from 'joi'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

function logout(req, res) {
	res.clearCookie("login", { httpOnly: false })
	res.status(200).json({ res: "Disconnected"})
}

export default  {
	description: 'logout from the API',
	type: 'get',
	path: '/api/logout',
	handlers: [
		logout
	],
}
