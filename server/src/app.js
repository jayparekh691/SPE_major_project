import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { userRouter } from './routes/users.js'
import { eventsRouter } from './routes/events.js'
import { hobbiesRouter } from './routes/hobbies.js'
import config from '../utils/config.js'
import yenv from "yenv";
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import multer from 'multer'
import bodyParser from 'body-parser'
import winston from 'winston'
// import { ElasticsearchTransport } from 'winston-elasticsearch'
import pkg from 'winston-elasticsearch'
const {ElasticsearchTransport} =pkg
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const app = express()
app.use(express.json())
app.use(cors())

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new ElasticsearchTransport({
      level: 'info',
      index: 'logs',
      clientOpts: {
        node: 'http://d1bd-119-161-98-68.ngrok-free.app',
      },
    }),
  ],
})

app.use((req, res, next) => {
  logger.info({
    message: 'API request',
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
  })

  res.on('finish', () => {
    logger.info({
      message: 'API response',
      method: req.method,
      path: req.path,
      status: res.statusCode,
    })
  })

  next()
})

// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, './logs/access.log'),
//   { flags: 'a' }
// )
// app.use(morgan('tiny', { stream: accessLogStream }))
app.use('/api/auth', userRouter)
app.use('/api/events', eventsRouter)
app.use('/api/hobbies', hobbiesRouter)
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'testing') {
  let env = yenv('env-local.yaml')
  let PORT = env.PORT
  let MONGODB_URI = env.MONGODB_URI
  mongoose
      .connect(MONGODB_URI)
      .then(() => {
        console.log(MONGODB_URI)
        console.log(PORT)
      })
      .catch((error) => {
        console.log(error.message)
        // logger.error(`Failed to connect to MongoDB: ${error.message}`)
      })
}
// else {
//   mongoose.connect(
//     'mongodb+srv://jayparekh:rock123A@production.074bxra.mongodb.net/?retryWrites=true&w=majority'
//   )
// }
else {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      console.log(config.MONGODB_URI)
      console.log(config.PORT)
    })
    .catch((error) => {
      console.log(error.message)
      // logger.error(`Failed to connect to MongoDB: ${error.message}`)
    })
}

export default app
