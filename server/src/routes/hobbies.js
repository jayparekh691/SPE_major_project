import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { HobbyModel } from '../models/Hobbies.js'
import { UserModel } from '../models/Users.js'


const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await HobbyModel.find({})
    res.json(response)
  } catch (err) {
    res.json(err)
  }
})

router.post('/', async (req, res) => {
  const event = new HobbyModel(req.body)
  try {
    const response = await event.save()
    res.json(response)
  } catch (err) {
    res.json(err)
  }
})

router.put('/', async (req, res) => {
  try {
    const hobby = await HobbyModel.findById(req.body.hobbyID)
    const user = await UserModel.findById(req.body.userID)
    // console.log("hobby.hobbyName")
    user.hobbies.push(hobby)
    hobby.userList.push(user)
    await hobby.save()
    await user.save()
    res.json(hobbies)
  } catch (err) {
    res.json(err)
  }
})
  
  router.post('/', async (req, res) => {
    const event = new HobbyModel(req.body)
    try {
      const response = await event.save()
      res.json(response)
    } catch (err) {
      res.json(err)
    }
  })


  router.get('/interestedHobbies/:userID', async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userID)
      const hobbies = await HobbyModel.find({
        _id: { $in: user.hobbies },
      })
      res.json({ hobbies: hobbies })
    } catch (err) {
      res.json(err)
    }
  })

router.put('/:hobbyID/user/:userID', async (req, res) => {
  try {
    const hobby = await HobbyModel.findById(req.params.hobbyID)
    const user = await UserModel.findById(req.params.userID)
    // console.log("hobby.hobbyName")
    const userIndex = hobby.userList.indexOf(req.params.userID);
    const hobbyIndex = user.hobbies.indexOf(req.params.hobbyID);
    console.log(userIndex)
    console.log(hobbyIndex)

    if (userIndex > -1) { // only splice array when item is found
      hobby.userList.splice(userIndex, 1); // 2nd parameter means remove one item only
    }
    if(hobbyIndex>-1){
      user.hobbies.splice(hobbyIndex,1);
    }
    await hobby.save()
    await user.save()
    res.json(hobbies)
  } catch (err) {
    res.json(err)
  }
})

router.get('/interestedHobbies/:userID', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID)
    const hobbies = await HobbyModel.find({
      _id: { $in: user.hobbies },
    })
    res.json({ hobbies: hobbies })
  } catch (err) {
    res.json(err)
  }
})

export { router as hobbiesRouter }
