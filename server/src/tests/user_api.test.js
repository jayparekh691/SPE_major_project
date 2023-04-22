import mongoose from 'mongoose'
import supertest from 'supertest'
import { UserModel } from '../models/Users'
import { application, response } from 'express'
import { jest } from '@jest/globals'
import app from '../app.js'
import {initializeEvents, initializeHobbies, initializeUsers} from "./test_helper.js";
import {HobbyModel} from "../models/Hobbies.js";
import {EventModel} from "../models/Events.js";
const api = supertest(app)

beforeAll(async () => {
  jest.setTimeout(30000)

  await UserModel.deleteMany({})
  await UserModel.insertMany(initializeUsers)
  // await HobbyModel.deleteMany({})
  // await HobbyModel.insertMany(initializeHobbies)
  // await EventModel.deleteMany({})
  // await EventModel.insertMany(initializeEvents)
})

describe('Login api', () => {
  describe('Give a username and password', () => {
    test('Correct username and password responds with status code 200', async () => {
      const user = {
        username: 'jayantmukundam',
        password: 'jayant',
      }
      await api.post('/auth/login').send(user).expect(200)
    })
  },30000)
  describe('Give a username and password', () => {
    test('Incorrect username or password responds with status code 400', async () => {
      const user = {
        username: 'jayantmukundam2811',
        password: 'mukundam',
      }
      await api.post('/auth/login').send(user).expect(400)
    })
  },30000)
  describe('Give a username and password', () => {
    test("Username doesn't exist responds with status code 400", async () => {
      const user = {
        username: 'mukundam',
        password: 'jayant',
      }
      await api.post('/auth/login').send(user).expect(400)
    })
  },30000)
})

describe('Create user API', () => {
  describe('Provide user details', () => {
    test('Correct user details responds with status code 200', async () => {
      const user = {
        name: 'jay',
        username: 'parekh',
        password: 'jay',
        address: 'kjdjf',
        district: 'dfj',
        state: 'fsdj',
        gender: 'saijdfj',
        mobilenumber: '546840',
      }
      await api.post('/auth/register').send(user).expect(200)
    }, 50000)

    test('Duplicate username responds with status code 400', async () => {
      const user = {
        name: 'jay',
        username: 'parekh',
        password: 'jay',
        address: 'kjdjf',
        district: 'dfj',
        state: 'fsdj',
        gender: 'saijdfj',
        mobilenumber: '546840',
      }
      await api.post('/auth/register').send(user).expect(400)
    }, 50000)
  })
})


afterAll(() => {
  mongoose.connection.close()
})