import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { userRouter } from './routes/users.js'
import { eventsRouter } from './routes/events.js'
import { hobbiesRouter } from './routes/hobbies.js'
import config from '../utils/config.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/auth', userRouter)
app.use('/events', eventsRouter)
app.use('/hobbies', hobbiesRouter)

console.log(process.env.NODE_ENV)

// if (process.env.NODE_ENV === 'testing') {
//   mongoose.connect(
//     'mongodb+srv://jayparekh:rock123A@cluster0.awazspn.mongodb.net/Cluster0?retryWrites=true&w=majority'
//   )
// } else {
//   mongoose.connect(
//     'mongodb+srv://jayparekh:rock123A@production.074bxra.mongodb.net/?retryWrites=true&w=majority'
//   )
// }

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

export default app
