import { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import { BACKEND_URL } from '../config'
import {Button, Col, Container, Row} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';

const backend = BACKEND_URL + '/api'

export default function AddHobbies() {
  const [hobbies, setHobbies] = useState([])
  const [selectedHobbies, setSelectedHobbies] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const userID = useGetUserID()

  const navigate = useNavigate()
  if (userID === null) navigate('/')


  useEffect(() => {
    setTimeout(()=>{
      setIsLoading(false)
    },3*1000)
    const fetchHobbies = async () => {
      try {
        const response = await axios.get(backend + '/hobbies')
        setHobbies(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchSelectedHobbies = async () => {
      try {
        const response = await axios.get(
          backend + '/hobbies/interestedHobbies/' + userID
        )
        console.log(response.data.hobbies)
        setSelectedHobbies(response.data.hobbies)
      } catch (error) {
        console.log(error)
      }
    }
    fetchHobbies()
    fetchSelectedHobbies()
  }, [isLoading])

  const selectHobby = async (hobbyID) => {
    // console.log(hobbyID)
    // console.log(userID)
    setIsLoading(true)
    try {
      const response = await axios.put(backend + '/hobbies', {
        hobbyID,
        userID,
      })
      alert('Hobby added')
      // setSelectedHobbies(response.data.hobbies)
      console.log(response.data.hobbies)
      setIsLoading(false)
      // window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const removeHobby = async (hobbyID) => {
    setIsLoading(true)
    try {
      const url = backend + '/hobbies/' + hobbyID + '/user/' + userID
      const response = await axios.put(url)
      alert('Hobby removed')
      // setSelectedHobbies(response.data.hobbies)
      console.log(response.data.hobbies)
      setIsLoading(false)
      // window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  var key = '_id'
  const isAdded = (id) => {
    let present = false
    if (selectedHobbies !== null) {
      selectedHobbies.forEach((element) => {
        if (element[key] === id) present = true
      })
    }

    return present
  }

  return (

    <div>
      <div style={{ margin: '10px', textAlign: 'center' }}>
        <h1>Hobbies</h1>
      </div>
      {
          isLoading &&
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
      }
      {
        !isLoading &&
        <Container fluid style={{textAlign:"center"}}>
          <Row lg={2}>
            {hobbies.map((h) => (
                <Card style={{ width: '25rem', margin: '10px' }}>
                  <Card.Body>
                    <Card.Img variant="top" src={h.image} />
                    <Card.Title>{h.hobbyName}</Card.Title>
                    <Card.Text>{h.hobbyDescription}</Card.Text>
                    <Row>
                      <Col>
                        <Button
                            variant="outline-primary"
                            onClick={() => selectHobby(h._id)}
                            disabled={isAdded(h._id)}
                        >
                          Add
                        </Button>
                      </Col>
                      <Col>
                        <Button
                            variant="outline-warning"
                            onClick={() => removeHobby(h._id)}
                            disabled={!isAdded(h._id)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
            ))}
          </Row>
        </Container>
      }

    </div>
  )
}
