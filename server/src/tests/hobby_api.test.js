import supertest from 'supertest'
import { UserModel } from '../models/Users'
import { application, response } from 'express'
import { jest } from '@jest/globals'
import app from '../app.js'
import { initializeHobbies, initializeUsers } from './test_helper.js'
import { HobbyModel } from '../models/Hobbies.js'
import mongoose from 'mongoose'
const api = supertest(app)

beforeAll(async () => {
  jest.setTimeout(30000)

  // await UserModel.deleteMany({})
  // await UserModel.insertMany(initializeUsers)
  await HobbyModel.deleteMany({})
  await HobbyModel.insertMany(initializeHobbies)
})

describe('Create hobby api', () => {
  test('Correct hobby details with no duplicate hobby name responds with status code 200', async () => {
    const hobby = {
      hobbyName: 'Volleyball',
      hobbyDescription: 'Random description of volleyball',
    }
    await api.post('/api/hobbies').send(hobby).expect(200)
  }, 50000)

  test('Duplicate hobby name will responds with status code 400', async () => {
    const hobby = {
      hobbyName: 'Cricket',
      hobbyDescription: 'Random description',
    }
    await api.post('/api/hobbies').send(hobby).expect(400)
  }, 50000)
})

describe('Get Hobbies API', () => {
  test('Provides list of all hobbies with response code 200', async () => {
    await api.get('/api/hobbies/').expect(200)
    // expect(response.body).toHaveLength(4)
  })
  test('Provides list of all the hobbies of the user with response code 200', async () => {
    api
      .get('/api/hobbies/interestedHobbies/' + '626bae84e8e209ce46777190')
      .expect(200)
  })
})
// //
describe('Add hobby', () => {
  test('Responds with status code 200 if user was successfully able to add a hobby', async () => {
    const request = {
      userID: '626bae84e8e209ce46777191',
      hobbyID: '626bae84e8e209ce46777193',
    }
    await api.put('/api/hobbies').send(request).expect(200)
  }, 30000)
})

describe('Remove hobby of a user', () => {
  test('Responds with status code 200 if user was successfully able to remove a hobby', async () => {
    await api
      .put(
        '/api/hobbies/' +
          '626bae84e8e209ce46777192' +
          '/user/' +
          '626bae84e8e209ce46777190'
      )
      .expect(200)
  }, 30000)
})

afterAll(() => {
  mongoose.connection.close()
})
