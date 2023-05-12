import { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import { BACKEND_URL } from '../config'
import cricket from '../cricket.jpeg'
import {Button, Col, Container, Row} from 'react-bootstrap'

const backend = BACKEND_URL + '/api'

export default function AddHobbies() {
  const [hobbies, setHobbies] = useState([])
  const [selectedHobbies, setSelectedHobbies] = useState([])
  const userID = useGetUserID()

  const navigate = useNavigate()
  if (userID === null) navigate('/')
  useEffect(() => {
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
  }, [])

  const selectHobby = async (hobbyID) => {
    // console.log(hobbyID)
    // console.log(userID)
    try {
      const response = await axios.put(backend + '/hobbies', {
        hobbyID,
        userID,
      })
      alert('Hobby added')
      // setSelectedHobbies(response.data.hobbies)
      console.log(response.data.hobbies)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const removeHobby = async (hobbyID) => {
    try {
      const url = backend + '/hobbies/' + hobbyID + '/user/' + userID
      const response = await axios.put(url)
      alert('Hobby removed')
      // setSelectedHobbies(response.data.hobbies)
      console.log(response.data.hobbies)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  var key = '_id'
  const isAdded = (id) => {
    let present = false
    if (selectedHobbies != null) {
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
    </div>
  )
}
