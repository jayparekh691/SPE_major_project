import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, uppercase: true, required: true },
  state: { type: String, uppercase: true, required: true },
  gender: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  participatedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
  hobbies: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'hobbies', default: null },

  ],
})

export const UserModel = mongoose.model('users', UserSchema)
