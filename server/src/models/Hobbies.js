import mongoose from 'mongoose'

const HobbySchema = new mongoose.Schema({
    hobbyName: { type: String, required: true, unique: true },
    hobbyDescription: {type: String, required:true},
    userList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    image:{type:String}

})

export const HobbyModel = mongoose.model('hobbies', HobbySchema)