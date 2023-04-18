import { EventModel } from '../models/Events.js'
import express from 'express'
import mongoose from 'mongoose'
import { UserModel } from '../models/Users.js'

const router = express.Router()

router.get('/:userID', async (req, res) => {
  try {
    const id = await UserModel.findById(req.params.userID)
    const dist = id.district
    const response = await EventModel.find({ district: dist })
    res.json(response)
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

router.delete('/:id',async(req,res)=> {
    const event = await EventModel.findById(req.params.id);

      const deleteEventsFromUser = async ()=>{
        for(const element of event.participants){
          const user = await UserModel.findById(element);
          const eventIndex = user.participatedEvents.indexOf(req.params.id);
          console.log(eventIndex)
          if (eventIndex > -1) {
            user.participatedEvents.splice(eventIndex, 1);
          }
          await user.save();
        }
      }

      deleteEventsFromUser();

  EventModel.findByIdAndDelete(req.params.id).then((event) => {
    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  }).catch((error) => {
    res.status(500).send(error);
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

router.put('/participatedEvents/remove', async (req, res) => {
  try {
    const event = await EventModel.findById(req.body.eventID)
    const user = await UserModel.findById(req.body.userID)
    user.participatedEvents.pop(event)
    event.participants.pop(user)
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

router.get("/createdEvents/:userID",async (req,res)=>{
  try{
    const events = await EventModel.find({"userOwner":req.params.userID});
    res.json(events);
  }catch(err){
    res.status(400)
    res.json(err)
  }
})

export { router as eventsRouter }
