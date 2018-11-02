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

app.use(
	cors(),
	bodyParser.urlencoded({extended: true}),
	cookieParser()
)

app.get('/api', (req, res) => {
	res.json({
		message: 'Welcome'
	})
})

app.post('/api/post', (req, res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err) {
			res.sendStatus(403)
		} else {
			res.json({
				authData: authData,
				message: 'Post created ...'
			})
		}
	})
})

// app.post('/api/login', (req, res) => {
// 	// Mock user
// 	const user = {
// 		id: 1,
// 		username: 'brad',
// 		email: 'brad@gmail.com'
// 	}
// 	jwt.sign({ user: user }, 'secretkey', { expiresIn: '30s' } , (err, token) => {
// 		res.json({
// 			token: token
// 		})
// 	})
// })



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
