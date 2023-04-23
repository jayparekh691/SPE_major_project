import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'

const router = express.Router()

router.post('/api/register', async (req, res) => {
  const {
    name,
    username,
    password,
    address,
    district,
    state,
    gender,
    mobilenumber,
  } = req.body
  console.log('In register server')
  const user = await UserModel.findOne({ username })

  if (user) {
    res.status(400)
    res.json({ message: 'Username already exist' })
    return res
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new UserModel({
    name,
    username,
    password: hashedPassword,
    address,
    district,
    state,
    gender,
    mobilenumber,
  })

  await newUser.save()

  res.status(200)
  res.json({ message: 'User Registered Successfully' })
  return res
})

router.post('/api/login', async (req, res) => {
  console.log('In login server')
  const { username, password } = req.body
  const user = await UserModel.findOne({ username })
  // console.log(user)
  if (!user) {
    res.status(400)
    res.json({ message: 'User dont exist' })
    return res
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    res.status(400)
    res.json({ message: 'Username or Password is incorrect' })
    return res
  }
  const token = jwt.sign({ id: user._id }, 'secret')
  res.json({ token, userID: user._id }).status(200)
})

export { router as userRouter }
