const express = require('express')
const app = express()
require('./db/mongoose')
const reporterRouter = require('./routers/reporter')
const newsRouter = require('./routers/news')
const News = require('./models/news')
const Reporter = require('./models/reporter')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
app.use(express.json())
app.use(reporterRouter)
app.use(newsRouter)

const port = 3000
app.listen(port,()=>{
    console.log('server is running')
})