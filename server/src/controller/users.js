import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { username, password, address, district, state, gender, mobilenumber } =
    req.body
  const user = await UserModel.findOne({ username })
  if (user) {
    res.sendStatus(409)
    return res.json({ message: 'Username already exist' })
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new UserModel({
    username,
    password: hashedPassword,
    address,
    district,
    state,
    gender,
    mobilenumber,
  })
  await newUser.save()
  res.json({ message: 'User Registered Successfully' })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await UserModel.findOne({ username })
  if (!user) {
    return res.json({ message: "User doesn't exist" }).status(409)
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res
      .json({ message: 'Username or Password is incorrect' })
      .status(409)
  }
  const token = jwt.sign({ id: user._id }, 'secret')
  res.json({ token, userID: user._id }).status(200)
})

export { router as userRouter }
