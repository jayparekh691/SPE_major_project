import { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import { BACKEND_URL } from '../config'
import {Button, Card, Container, ListGroup, Row} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import Loader from "../components/Loader";

const backend = BACKEND_URL + '/api'

export default function Home() {
  const [events, setEvents] = useState([])
  const [participatedEvents, setParticipatedEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const userID = useGetUserID()
  const navigate = useNavigate()
  window.history.forward()
  window.onunload = async function () {
    return
  }
  if (userID === null) navigate('/')
  useEffect(() => {
    setTimeout(()=>{
      setIsLoading(false)
    },3*1000)
    const fetchEvents = async () => {
      try {
        const response = await axios.get(backend + '/events/' + userID)
        setEvents(response.data)
        // console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchParticipatedEvents = async () => {
      try {
        const response = await axios.get(
          backend + '/events/participatedEvents/ids/' + userID
        )
        // console.log(response.data.participatedEvents)
        setParticipatedEvents(response.data.participatedEvents)
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvents()
    fetchParticipatedEvents()
  }, [isLoading])

  const participate = async (eventID) => {
    setIsLoading(true)
    try {
      const response = await axios.put(backend + '/events', {
        eventID,
        userID,
      })
      // alert('Participated')
      setParticipatedEvents(response.data.participatedEvents)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const isParticipated = (id) => participatedEvents?.includes(id)

  return (
    <div>
      <div style={{ margin: '5px', textAlign: 'center' }}>
        <h1>New Events</h1>
      </div>

      {
          isLoading &&
          <Loader/>
      }

      {
        !isLoading &&

          <Container fluid style={{textAlign:"center"}}>
            <Row lg={2}>

              {events.length !== undefined &&
                  events.map((e) => (

                      <Card style={{ width: '25rem', margin:'10px'}}>
                        <Card.Body>
                          <Card.Img variant="top" src={e.image} />
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

                          <Button
                              variant="outline-primary"
                              onClick={() => participate(e._id)}
                              disabled={isParticipated(e._id)}
                          >
                            Participate
                          </Button>
                        </Card.Body>
                      </Card>

                  ))
              }
            </Row>
          </Container>
      }


    </div>
  )
}
