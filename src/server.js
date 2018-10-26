import express from 'express'
import { Client } from 'pg'
import bodyParser from 'body-parser'
import chalks from 'Utils/chalks'

import hangmanRoutes from 'Routes'
import { port, db } from 'Configuration/config'
import hangman from 'Database/hangman'
//import sequilize from 'Configuration/database'

const app = express()
const log = console.log

log(chalks.bgsuccess('server up and running on port : ', port))

app.use(bodyParser.urlencoded({extended: true}))

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
