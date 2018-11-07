import login from './auth/login'
import signin from './auth/signin'
import logout from './auth/logout'
import getOne from './expressions/getOne'
import addOneE from './expressions/addOne'
import addOneU from './users/addOne'

export const noAuth = [
	login,
	signin,
	logout,
	addOneU
]

export const Auth = [
	getOne,
	addOneE
]
