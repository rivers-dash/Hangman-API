import Expressions from 'Models/expressions'
import bodyParser from 'body-parser'
import apis from 'Api'
import chalks from 'Utils/chalks'

var jsonParser = bodyParser.json()
console.log(chalks.bginfo('Loading API routes : '))
export default function(app, db) {

	apis.forEach(function(api) {
		const { description, type, path, handlers, schema } = api


		console.log(chalks.bginfo(type.toUpperCase()), description, ' : ', chalks.warning(path))
		app[type](path, jsonParser, handlers)

	})

};
