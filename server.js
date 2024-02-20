import express from 'express'
import { dbconnection } from './Database/dbConnection.js'
import { boostrap } from './src/indexsRouters.js'
const app = express()
const port = 3000

dbconnection()

app.use(express.json())
boostrap(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))