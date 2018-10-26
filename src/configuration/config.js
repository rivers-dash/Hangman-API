const config = require('../../config');
require('dotenv').config()

const mode = 'dev'

export const port = config[mode].app.port
export const db = config[mode].db
