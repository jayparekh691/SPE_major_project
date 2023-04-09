import { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default function Home() {
  const [events, setEvents] = useState([])
  const [participatedEvents, setParticipatedEvents] = useState([])
  const userID = useGetUserID()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/events')
        setEvents(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchParticipatedEvents = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/events/participatedEvents/ids/' + userID
        )
        console.log(response.data.participatedEvents)
        setParticipatedEvents(response.data.participatedEvents)
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvents()
    fetchParticipatedEvents()
  }, [])

  const participate = async (eventID) => {
    try {
      const response = await axios.put('http://localhost:3001/events', {
        eventID,
        userID,
      })
      alert('Participated')
      setParticipatedEvents(response.data.participatedEvents)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const isParticipated = (id) => participatedEvents?.includes(id)

  return (
    <div>
      <h1>New Events</h1>
      <ul>
        {events.map((e) => (
          <li key={e._id}>
            <div>
              <h2>{e.eventname}</h2>
              <button
                onClick={() => participate(e._id)}
                disabled={isParticipated(e._id)}
              >
                Participate
              </button>
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
