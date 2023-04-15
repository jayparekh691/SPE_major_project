import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  gender: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  participatedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
  hobbies: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'hobbies', unique: true },
  ],
})

export const UserModel = mongoose.model('users', UserSchema)
