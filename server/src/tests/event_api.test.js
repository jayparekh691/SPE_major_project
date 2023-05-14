import mongoose from 'mongoose'
import supertest from 'supertest'
import { UserModel } from '../models/Users'
import { application, response } from 'express'
import { jest } from '@jest/globals'
import app from '../app.js'
import { initializeEvents, initializeUsers } from './test_helper.js'
import { EventModel } from '../models/Events.js'
const api = supertest(app)

beforeAll(async () => {
  jest.setTimeout(30000)

  await UserModel.deleteMany({})
  await UserModel.insertMany(initializeUsers)
  await EventModel.deleteMany({})
  await EventModel.insertMany(initializeEvents)
})

describe('Create Event api', () => {
  test('Correct event details with no duplicate eventname responds with status code 200', async () => {
    const event = {
      eventname: 'Hole Digger',
      hobbyname: 'Carrom',
      registrationDate: 'April 30th 2023',
      location: 'sfakjb',
      district: 'asod',
      state: 'adhf',
      description: 'asdkjb',
      eventDate: '15th May 2023',
      minParticipation: 10,
      userOwner: '626bae84e8e209ce46777191',
    }
    await api.post('/api/events').send(event).expect(200)
  }, 50000)
  test('Duplicate eventname will responds with status code 400', async () => {
    const event = {
      eventname: 'Hole Digger',
      hobbyname: 'Carrom',
      registrationDate: 'April 30th 2023',
      location: 'sfakjb',
      district: 'asod',
      state: 'adhf',
      description: 'asdkjb',
      eventDate: '15th May 2023',
      minParticipation: 10,
      userOwner: '626bae84e8e209ce46777191',
    }
    await api.post('/api/events').send(event).expect(400)
  }, 50000)
})

describe('Get Events API', () => {
  test('Provides list of all events for user with response code 200', async () => {
    await api.get('/api/events/' + '626bae84e8e209ce46777190').expect(200)
  }, 50000)
  test('Provides list of events id where user has participated with status code 200', async () => {
    await api.get('/api/events/participatedEvents')
  }, 50000)
})
describe('Participate in event', () => {
  test('Responds with status code 200 if user was successfully able to participate in event', async () => {
    const request = {
      userID: '626bae84e8e209ce46777191',
      eventID: '626bae84e8e209ce46777195',
    }
    await api.put('/api/events').send(request).expect(200)
  }, 30000)
})

describe("Get id's of all events where user has participated", () => {
  test('Responds with status code 200 if server was successful to fetch details', async () => {
    await api
      .get('/api/events/participatedEvents/ids/626bae84e8e209ce46777191')
      .expect(200)
  })
})

describe('Remove participation from event', () => {
  test('Responds with status code 200 if user was successful to remove participation from an event', async () => {
    await api
      .put(
        '/api/events/participatedEvents/remove/626bae84e8e209ce46777190/626bae84e8e209ce46777196'
      )
      .expect(200)
  })
})
