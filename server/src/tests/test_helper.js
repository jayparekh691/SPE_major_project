import mongoose from "mongoose";
import { UserModel } from '../models/Users.js'
import {EventModel} from "../models/Events.js";
import {HobbyModel} from "../models/Hobbies.js";


/*
  MongoDB IDs for Reference
  * USER 1: 626bae84e8e209ce46777190
  * USER 2: 626bae84e8e209ce46777191
  * HOBBY 1(Cricket): 626bae84e8e209ce46777192 (user 1)
  * HOBBY 2(Football): 626bae84e8e209ce46777193 (user 1)
  * HOBBY 3(Badminton): 626bae84e8e209ce46777194 (user 2)
  * EVENT 1(IIITB Premiere league): 626bae84e8e209ce46777195 (user 1)
  * EVENT 2(spandan): 626bae84e8e209ce46777196 (user 1)
  * EVENT 3(umang): 626bbee982df749de111a4ca (user 1)
*/

const initializeUsers = [
    {
        "name":"jayant",
        "username":"jayantmukundam",
        "password":"$2b$10$XCZCXQkEt5xH8EBC9OWp..kp9Xlm39ePBZoKFCnl1rL7Zw4cceK1q",
        "address":"IIITB",
        "district":"Bangalore",
        "state":"Karnataka",
        "gender":"m",
        "mobilenumber":"875824323",
        "participatedEvents":[
            '626bae84e8e209ce46777195',
            '626bae84e8e209ce46777196'
        ],
        "hobbies":[
            '626bae84e8e209ce46777192',
            '626bae84e8e209ce46777193'
        ],
        "_id":new mongoose.Types.ObjectId("626bae84e8e209ce46777190")
    },
    {
        "name":"Jay",
        "username":"jay",
        "password":"$2b$10$h/QYM2FM1/K5NUCv6lhHBOWA7.kgCcU3KXR5OtUevSrvS7dcsjovq",
        "address":"B-360",
        "district":"Bangalore",
        "state":"Karnataka",
        "gender":"Male",
        "mobilenumber":"4684687461",
        "participatedEvents":[
            '626bbee982df749de111a4ca'

        ],
        "hobbies":[
            '626bae84e8e209ce46777194'
        ],
        "_id":new mongoose.Types.ObjectId("626bae84e8e209ce46777191")
    }
]

const initializeHobbies =[
    {
        "hobbyName": "Cricket",
        "hobbyDescription":"Random description of Cricket",
        "userList":[
            "626bae84e8e209ce46777190"
        ],
        '_id': new mongoose.Types.ObjectId("626bae84e8e209ce46777192")
    },
    {
        "hobbyName": "Football",
        "hobbyDescription":"Random description of Football",
        "userList":[
            '626bae84e8e209ce46777190',
            '626bae84e8e209ce46777191'
        ],
        '_id': new mongoose.Types.ObjectId('626bae84e8e209ce46777193')
    },
    {
        "hobbyName": "Badminton",
        "hobbyDescription":"Random description of Badminton",
        "userList":[
            '626bae84e8e209ce46777191'
        ],
        '_id':new mongoose.Types.ObjectId('626bae84e8e209ce46777194')
    }
]

const initializeEvents=[
    {
        "eventname": "IIITB Premiere league",
        "hobbyname": "Cricket",
        "registrationDate": "11/04/24",
        "location": "IIITB ground",
        "district": "Bangalore",
        "state":"Karnataka",
        "description":"Friendly cricket tournament",
        "eventDate": "15/04/24",
        "minParticipation":11,
        "participants":[
            '626bae84e8e209ce46777190'
        ],
        "userOwner":"626bae84e8e209ce46777190",
        '_id':'626bae84e8e209ce46777195'
    },
    {
        "eventname": "Spandan",
        "hobbyname": "Football",
        "registrationDate": "11/04/24",
        "location": "IIITB ground",
        "district": "Bangalore",
        "state":"Karnataka",
        "description":"Friendly football tournament",
        "eventDate": "15/04/24",
        "minParticipation":11,
        "participants":[
            '626bae84e8e209ce46777190'
        ],
        "userOwner":"626bae84e8e209ce46777190",
        '_id':'626bae84e8e209ce46777196'
    },
    {
        "eventname": "Umang",
        "hobbyname": "Badminton",
        "registrationDate": "11/04/24",
        "location": "IIITB ground",
        "district": "Bangalore",
        "state":"Karnataka",
        "description":"Friendly badminton tournament",
        "eventDate": "15/04/24",
        "minParticipation":11,
        "participants":[
            '626bae84e8e209ce46777191'
        ],
        "userOwner":"626bae84e8e209ce46777191",
        '_id':'626bbee982df749de111a4ca'
    }
]

const userDb = async()=>{
    const users = await UserModel.find({})
    return users.map(user => user.toJSON())

}

const hobbyDb = async()=>{
    const hobbies = await HobbyModel.find({})
    return hobbies.map(hobby=>hobby.toJSON())
}

const eventDb = async()=>{
    const events = await EventModel.find({})
    return events.map(event=>event.toJSON())
}

// module.exports = {initializeUsers, initializeEvents, initializeHobbies, userDb, eventDb, hobbyDb};
export {
    initializeUsers as initializeUsers,
    initializeHobbies as initializeHobbies,
    initializeEvents as initializeEvents
}