require('dotenv').config()
import express from 'express'
import { Client } from 'pg'
import bodyParser from 'body-parser'
import chalks from 'Utils/chalks'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import hangmanRoutes from 'Routes'
import { port, db } from 'Configuration/config'
import hangman from 'Database/hangman'


import jwt from 'jsonwebtoken'


const app = express()
const log = console.log

log(chalks.bgsuccess('server up and running on port : ', port))

var corsOptions = {
  origin: true,
	credentials: true,
}

app.use(
	cors(corsOptions),

	function (req, res, next) {
		// check if client sent cookie
		//console.log(req)
		// var cookie = req.cookies.login;
		// if (cookie === undefined)
		// {
		// 	// no: set a new cookie
		// 	var randomNumber=Math.random().toString();
		// 	randomNumber=randomNumber.substring(2,randomNumber.length);
		// 	res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
		// 	console.log('cookie created successfully');
		// }
		// else
		// {
		// 	// yes, cookie was already present
		// 	console.log('cookie exists', cookie);
		// }
		next(); // <-- important!
	},


	bodyParser.urlencoded({extended: true}),
	cookieParser()
)

// res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
// res.header('Access-Control-Allow-Credentials', 'true')

hangman
.authenticate()
  .then(() => {
    log(chalks.bginfo('Connection to database established successfully.'))
		hangmanRoutes(app, {});
		app.listen(port, () => {
			})
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })
