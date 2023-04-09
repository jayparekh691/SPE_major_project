import mongoose, { mongo } from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  gender: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  participatedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
})

export const UserModel = mongoose.model('users', UserSchema)
