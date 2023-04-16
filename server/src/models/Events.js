import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  eventname: { type: String, required: true, unique: true },
  hobbyname: { type: String, required: true },
  registrationDate: { type: String, required: true },
  location: { type: String, required: true },
  district: { type: String, uppercase: true, required: true },
  state: { type: String, uppercase: true, required: true },
  description: { type: String, required: true },
  eventDate: { type: String, required: true },
  minParticipation: { type: Number, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
})

export const EventModel = mongoose.model('events', EventSchema)
