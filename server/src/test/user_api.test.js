import mongoose from 'mongoose'
import supertest from 'supertest'
import { UserModel } from '../models/Users'
import { application, response } from 'express'
import app from '../index.js'
const api = supertest(app)

describe('Login api', () => {
  describe('Give a username and password', () => {
    test('Correct username and password responds with status code 200', async () => {
      const user = {
        username: 'jay',
        password: 'jay',
      }
      await api.post('/auth/login').send(user).expect(200)
    })
  })
  describe('Give a username and password', () => {
    test('Incorrect username or password responds with status code 409', async () => {
      const user = {
        username: 'jay',
        password: 'parekh',
      }
      await api.post('/auth/login').send(user).expect(409)
    })
  })
})

// describe('Create user API',()=>{
//   describe('Provide user details',()=>{
//     test('Correct user details responds with status code 200')
//   })
// })
