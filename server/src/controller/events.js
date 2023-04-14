import { EventModel } from '../models/Events.js'
import express from 'express'
import mongoose from 'mongoose'
import { UserModel } from '../models/Users.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await EventModel.find({})
    res.json(response)
  } catch (err) {
    res.json(err)
  }
})

router.post('/', async (req, res) => {
  const event = new EventModel(req.body)
  try {
    const response = await event.save()
    res.json(response)
  } catch (err) {
    res.json(err)
  }
})

router.put('/', async (req, res) => {
  try {
    const event = await EventModel.findById(req.body.eventID)
    const user = await UserModel.findById(req.body.userID)
    user.participatedEvents.push(event)
    event.participants.push(user)
    await event.save()
    await user.save()
    res.json(participatedEvents)
  } catch (err) {
    res.json(err)
  }
})

router.get('/participatedEvents/ids/:userID', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID)
    // console.log(req.params.userID)
    res.json({ participatedEvents: user?.participatedEvents })
  } catch (err) {
    res.json(err)
  }
})

router.get('/participatedEvents/:userID', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID)
    const participatedEvents = await EventModel.find({
      _id: { $in: user.participatedEvents },
    })
    res.json({ participatedEvents: participatedEvents })
  } catch (err) {
    res.json(err)
  }
})
export { router as eventsRouter }
