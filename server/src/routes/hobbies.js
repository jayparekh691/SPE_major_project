import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { HobbyModel } from '../models/Hobbies.js'
import {UserModel} from "../models/Users.js"

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
