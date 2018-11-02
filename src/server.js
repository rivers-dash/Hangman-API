import express from 'express'
import { Client } from 'pg'
import bodyParser from 'body-parser'
import chalks from 'Utils/chalks'
import cors from 'cors'

import hangmanRoutes from 'Routes'
import { port, db } from 'Configuration/config'
import hangman from 'Database/hangman'


import jwt from 'jsonwebtoken'


const app = express()
const log = console.log

log(chalks.bgsuccess('server up and running on port : ', port))

app.use(
	cors(),
	bodyParser.urlencoded({extended: true})
)

app.get('/api', (req, res) => {
	res.json({
		message: 'Welcome'
	})
})

app.post('/api/post', verifyToken, (req, res) => {
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

// Format verifyToken
// Authorization: barer <access_token>
function verifyToken (req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization']
	// Check if barer is undefined
	if(typeof bearerHeader !== 'undefined') {
		// split at the space
		const bearer = bearerHeader.split(' ')
		// Get token from array
		const bearerToken = bearer[1]
		// Set token
		req.token = bearerToken
		// Next middleware
		next()
	} else {
		// Unauthorized
		res.sendStatus(403)
	}
}

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
