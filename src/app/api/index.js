import login from './auth/login'
import signin from './auth/signin'
import logout from './auth/logout'
import getOne from './expressions/getOne'
import addOne from './expressions/addOne'
import editOne from './users/editOne'
import scores from './scores/scores'


export const noAuth = [
	login,
	signin,
	logout,
]

export const Auth = [
	getOne,
	addOne,
	editOne,
	scores
]
