import login from './auth/login'
import signin from './auth/signin'
import getOne from './expressions/getOne'
import addOne from './expressions/addOne'

export const noAuth = [
	login,
	signin
]

export const Auth = [
	getOne,
	addOne
]
