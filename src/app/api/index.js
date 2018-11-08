import login from './auth/login'
import signin from './auth/signin'
import logout from './auth/logout'
import getExpression from './expressions/getExpression'
import addExpression from './expressions/addExpression'
import editUser from './users/editUser'
import getScores from './scores/getScores'


export const noAuth = [
	login,
	signin,
	logout,
]

export const Auth = [
	getExpression,
	addExpression,
	editUser,
	getScores
]
