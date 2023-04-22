import { EventModel } from '../models/Events.js'
import express from 'express'
import mongoose from 'mongoose'
import { UserModel } from '../models/Users.js'
import { HobbyModel } from '../models/Hobbies.js'

const router = express.Router()

router.get('/:userID', async (req, res) => {
  try {
    const id = await UserModel.findById(req.params.userID)
    const dist = id.district
    const hobbies = id.hobbies
    const response = await EventModel.find({ district: dist })
    let result = []
    for (let index = 0; index < response.length; index++) {
      for (let index1 = 0; index1 < hobbies.length; index1++) {
        let hobby = await HobbyModel.findById(hobbies[index1])
        if (response[index].hobbyname === hobby.hobbyName) {
          result.push(response[index])
          break
        }
      }
    }
    res.json(result)
  } catch (err) {
    console.log(err.message)
    res.json(err)
  }
})

router.post('/', async (req, res) => {
  const event = new EventModel(req.body)
  try {
    const response = await event.save()

    res.status(200)
    res.json(response)
  } catch (err) {
    console.log(err.message)
    res.status(400)
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
    res.status(200)
    res.json(user.participatedEvents)
    return res
  } catch (err) {
    res.status(400)
    res.json(err)
  }
})

router.delete('/:id', async (req, res) => {
  const event = await EventModel.findById(req.params.id)

  const deleteEventsFromUser = async () => {
    for (const element of event.participants) {
      const user = await UserModel.findById(element)
      const eventIndex = user.participatedEvents.indexOf(req.params.id)
      console.log(eventIndex)
      if (eventIndex > -1) {
        user.participatedEvents.splice(eventIndex, 1)
      }
      await user.save()
    }
  }

  deleteEventsFromUser()

  EventModel.findByIdAndDelete(req.params.id)
    .then((event) => {
      if (!event) {
        return res.status(404).send()
      }
      res.send(event)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

router.get('/participatedEvents/ids/:userID', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID)
    // console.log(req.params.userID)
    res.json({ participatedEvents: user?.participatedEvents })
  } catch (err) {
    res.status(400)
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
    console.log(err.message)
    res.json(err)
  }
})

router.put('/participatedEvents/remove/:userID/:eventID', async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.eventID)
    const user = await UserModel.findById(req.params.userID)
    // user.participatedEvents.pop(event)
    // event.participants.pop(user)
    const eventIndex = user.participatedEvents.indexOf(event._id)
    const userIndex = event.participants.indexOf(user._id)
    if (eventIndex > -1) {
      console.log('user')
      user.participatedEvents.splice(eventIndex, 1)
    }
    if (userIndex > -1) {
      console.log('event')
      event.participants.splice(userIndex, 1)
    }
    await event.save()
    await user.save()
    res.status(200)
    res.json(user.participatedEvents)
    return res
  } catch (err) {
    console.log(err.message)
    res.status(400)
    res.json(err)
  }
})

router.get('/createdEvents/:userID', async (req, res) => {
  try {
    const events = await EventModel.find({ userOwner: req.params.userID })
    res.json(events)
  } catch (err) {
    res.status(400)
    res.json(err.message)
  }
})

router.get('/createdEvents/hobbies/:userID', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID)
    const userHobbies = []
    console.log(user.hobbies)
    for (let index = 0; index < user.hobbies.length; index++) {
      const element = user.hobbies[index]
      const hobby = await HobbyModel.findById(element)
      userHobbies.push(hobby.hobbyName)
    }
    res.json({ hobbies: userHobbies })
  } catch (err) {
    res.status(400)
    res.json(err.message)
  }
})

export { router as eventsRouter }
