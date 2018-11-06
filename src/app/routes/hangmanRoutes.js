import Expressions from 'Models/expressions'
import bodyParser from 'body-parser'
import { noAuth, Auth } from 'Api'
import chalks from 'Utils/chalks'
import jwt from 'jsonwebtoken'

var jsonParser = bodyParser.json()

console.log(chalks.bginfo('Loading API routes : '))

function verifyLogin (req, res, next) {
	if(typeof req.cookies.login !== 'undefined') {
		jwt.verify(req.cookies.login, process.env.DEV_PRIVATE_KEY, function(err, decoded) {
		  if(err) {
				res.status(403).json({ error: "Invalid cookie"})
			} else if (decoded) {
				next()
			}
		})
	} else {
		res.status(403).json({ error: "No cookie found"})
	}
}


export default function(app, db) {
	noAuth.forEach(function(api) {
		const { description, type, path, handlers, schema } = api
		console.log(chalks.bginfo(type.toUpperCase()), chalks.warning(path), ' : ', description)
		app[type](path, jsonParser, handlers)
	})

	Auth.forEach(function(api) {
		const { description, type, path, handlers, schema } = api
		console.log(chalks.bginfo(type.toUpperCase()), chalks.warning(path), ' : ', description)
		app[type](path, verifyLogin, jsonParser, handlers)
	})

};
