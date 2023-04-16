import mongoose from 'mongoose'
import supertest from 'supertest'
import { UserModel } from '../models/Users'
import { application, response } from 'express'
import { jest } from '@jest/globals'
import app from '../app.js'
const api = supertest(app)

describe('Create Event api', () => {
  //   test('Correct event details with no duplicate eventname responds with status code 200', async () => {
  //     const event = {
  //       eventname: 'Hole Digger',
  //       hobbyname: 'Carrom',
  //       registrationDate: 'April 30th 2023',
  //       location: 'sfakjb',
  //       district: 'asod',
  //       state: 'adhf',
  //       description: 'asdkjb',
  //       eventDate: '15th May 2023',
  //       minParticipation: 10,
  //       userOwner: '64395522aca8d64efc05110e',
  //     }
  //     await api.post('/events').send(event).expect(200)
  //   }, 50000)
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
      userOwner: '64395522aca8d64efc05110e',
    }
    await api.post('/events').send(event).expect(400)
  }, 50000)
})

describe('Get Events API', () => {
  test('Provides list of all events for user with response code 200', async () => {
    await api.get('/events/' + '643986e8a5865f75d5b26a71').expect(200)
  })
  test('Provides list of events id where user has participated with status code 200', async () => {
    await api.get('/events/participatedEvents')
  })
})
describe('Participate in event', () => {
  //   test('Responds with status code 200 if user was successfully able to participate in event', async () => {
  //     const request = {
  //       userID: '643986e8a5865f75d5b26a71',
  //       eventID: '6439871b38af1246b90ae863',
  //     }
  //     await api.put('/events').send(request).expect(200)
  //   }, 30000)
  //   test('Responds with status code 400 if user was unable to participate in event', async () => {
  //     const request = {
  //       userID: '643986e8a5865f75d5b26a71',
  //       eventID: '6439871b38af1246b90ae863',
  //     }
  //     await api.put('/events').send(request).expect(400)
  //   }, 30000)
})

describe("Get id's of all events where user has participated", () => {
  test('Responds with status code 200 if server was successfull to fetch details', async () => {
    await api
      .get('/events/participatedEvents/ids/643986e8a5865f75d5b26a71')
      .expect(200)
  })
})

describe('Remove participation from event', () => {
  // test('Responds with status code 200 if user was successfull to remove participation from event', async () => {
  //   const remove = {
  //     userID: '643986e8a5865f75d5b26a71',
  //     eventID: '6439871b38af1246b90ae863',
  //   }
  //   await api.put('/events/participatedEvents/remove').send(remove).expect(200)
  // })
})
