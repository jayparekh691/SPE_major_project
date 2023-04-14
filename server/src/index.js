import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './controller/users.js'
import { eventsRouter } from './controller/events.js'
const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', userRouter)
app.use('/events', eventsRouter)
mongoose.connect(
  'mongodb+srv://jayparekh:rock123A@cluster0.awazspn.mongodb.net/Cluster0?retryWrites=true&w=majority'
)

app.listen(3001, () => console.log('Server Started'))

export default app
