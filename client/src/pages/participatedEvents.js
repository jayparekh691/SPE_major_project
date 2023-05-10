import { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

const backend = BACKEND_URL + '/api'

export default function ParticipatedEvents() {
  const [participatedEvents, setParticipatedEvents] = useState([])
  const userID = useGetUserID()
  const navigate = useNavigate()
  if (userID === null) navigate('/')

  useEffect(() => {
    const fetchParticipatedEvents = async () => {
      try {
        const response = await axios.get(
          backend + '/events/participatedEvents/' + userID
        )
        setParticipatedEvents(response.data.participatedEvents)
      } catch (err) {
        console.log(err)
      }
    }
    fetchParticipatedEvents()
  }, [])

  const remove = async (eventID) => {
    try {
      const response = await axios.put(
        backend + '/events/participatedEvents/remove/' + userID + '/' + eventID
      )
      alert('Removed')
      setParticipatedEvents(response.data.participatedEvents)
      window.location.reload()
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <h1>Participated Events</h1>
      <ul>
        {participatedEvents?.map((e) => (
          <li key={e._id}>
            <div>
              <h2>{e.eventname}</h2>
              {<button onClick={() => remove(e._id)}>Remove</button>}
              <br />
              <br />
            </div>
            <div className="hobbyname">
              <h4>Hobby Name : {e.hobbyname}</h4>
            </div>
            <div className="registrationDate">
              <h4>Registration Date : {e.registrationDate}</h4>
            </div>
            <div className="location">
              <h4>Location : {e.location}</h4>
            </div>
            <div className="district">
              <h4>District : {e.district}</h4>
            </div>
            <div className="state">
              <h4>State : {e.state}</h4>
            </div>
            <div className="eventDate">
              <h4>Event Date : {e.eventDate}</h4>
            </div>
            <div className="minParticipation">
              <h4>Min Participation required : {e.minParticipation}</h4>
            </div>
            <div className="currParticipation">
              <h4>Current Participant Count : {e.participants.length}</h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
