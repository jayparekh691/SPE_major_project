import { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import {Button, Card, Container, Row} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Loader from "../components/Loader";


const backend = BACKEND_URL + '/api'

export default function ParticipatedEvents() {
  const [participatedEvents, setParticipatedEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const userID = useGetUserID()
  const navigate = useNavigate()
  if (userID === null) navigate('/')

  useEffect(() => {
    setTimeout(()=>{
      setIsLoading(false)
    },3*1000)
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
  }, [isLoading])

  const remove = async (eventID) => {
    setIsLoading(true)
    if(isLoading==true)
      console.log("participated loader true")
    else
      console.log("participated loader false")
    try {
      const response = await axios.put(
        backend + '/events/participatedEvents/remove/' + userID + '/' + eventID
      )
      // alert('Removed')
      setParticipatedEvents(response.data.participatedEvents)
      setIsLoading(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <div style={{ margin: '10px', textAlign: 'center' }}>
        <h1>Participated Events</h1>
      </div>

      {
          isLoading &&
          <Loader/>
      }


      {
        !isLoading &&
        <Container style={{textAlign: "center"}}>
          <Row lg={2}>

            {participatedEvents !== undefined &&
                participatedEvents.map((e) => (
                    <Card style={{width: '25rem', margin: '10px'}}>
                      <Card.Body>
                        <Card.Img variant="top" src={e.image}/>
                        <Card.Title>{e.eventname}</Card.Title>
                        <Card.Text>Description : {e.description}</Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">
                          Hobby name : {e.hobbyname}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                          Registration Deadline : {e.registrationDate}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                          Event Date : {e.eventDate}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                          Location : {e.location}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                          State : {e.state}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                          District : {e.district}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                          Min participants required : {e.minParticipation}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                          Current participant count : {e.participants.length}
                        </Card.Subtitle>

                        <Button variant="outline-warning" onClick={() => remove(e._id)}>
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                ))}
          </Row>
        </Container>
      }
    </div>
  )
}
