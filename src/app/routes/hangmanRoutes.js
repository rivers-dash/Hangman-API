import Expressions from 'Models/expressions'
import bodyParser from 'body-parser'
import { noAuth, Auth } from 'Api'
import chalks from 'Utils/chalks'
import jwt from 'jsonwebtoken'

var jsonParser = bodyParser.json()

console.log(chalks.bginfo('Loading API routes : '))

function verifyToken (req, res, next) {
	if(typeof req.cookies.token !== 'undefined') {
		jwt.verify(req.cookies.token, process.env.DEV_PRIVATE_KEY, function(err, decoded) {
		  if(err) {
				res.sendStatus(403)
			} else if (decoded) {
				next()
			}
		})
	} else {
		res.sendStatus(403)
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
		app[type](path, verifyToken, jsonParser, handlers)
	})

};
