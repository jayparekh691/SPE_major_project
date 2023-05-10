import { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import {Button, Card} from "react-bootstrap";
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
        <div style={{margin:"10px",textAlign:"center"}}>
          <h1>Participated Events</h1>
        </div>

        {participatedEvents!== undefined && participatedEvents.map((e) => (
            <Card style={{width: '18rem',margin:"1rem"}}>
              <Card.Body>
                <Card.Title>{e.eventname}</Card.Title>
                <Card.Text>Description : {e.description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Hobby name : {e.hobbyname}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Registration Deadline : {e.registrationDate}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Event Date : {e.eventDate}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Location : {e.location}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">State : {e.state}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">District : {e.district}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Min participants required : {e.minParticipation}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Current participant count : {e.participants.length}</Card.Subtitle>

                <Button variant="outline-warning"
                    onClick={() => remove(e._id)}
                >Remove</Button>
              </Card.Body>
            </Card>
        ))
        }
      </div>

  )
}
