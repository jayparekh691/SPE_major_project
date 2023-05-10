import { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID'
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import { BACKEND_URL } from '../config'
import cricket from '../cricket.jpeg'
import {Button, Col, Row} from "react-bootstrap";

const backend = BACKEND_URL + '/api'

export default function AddHobbies() {
  const [hobbies, setHobbies] = useState([])
  const [selectedHobbies, setSelectedHobbies] = useState([])
  const userID = useGetUserID()

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
        <div style={{margin:"10px",textAlign:"center"}}>
         <h1>Hobbies</h1>
        </div>
      {/*//   <ul>*/}
      {/*//     {hobbies.map((h) => (*/}
      {/*//         <li key={h._id}>*/}
      {/*//           <div>*/}
      {/*//             <h2>{h.hobbyName}</h2>*/}
      {/*//             <button*/}
      {/*//                 className="custom-button"*/}
      {/*//                 onClick={() => selectHobby(h._id)}*/}
      {/*//                 disabled={isAdded(h._id)}*/}
      {/*//             >*/}
      {/*//               Add*/}
      {/*//             </button>*/}
      {/*//             <button*/}
      {/*//                 className="custom-button"*/}
      {/*//                 onClick={() => removeHobby(h._id)}*/}
      {/*//                 disabled={!isAdded(h._id)}*/}
      {/*//             >*/}
      {/*//               Delete*/}
      {/*//             </button>*/}
      {/*//             <br />*/}
      {/*//             <br />*/}
      {/*//           </div>*/}
      {/*//           <div className="image-div">*/}
      {/*//             <img src={h.image}/>*/}
      {/*//           </div>*/}
      {/*//           <div className="hobbyDescription">*/}
      {/*//             <h4>Hobby Description : {h.hobbyDescription}</h4>*/}
      {/*//           </div>*/}
      {/*//         </li>*/}
      {/*//     ))}*/}
      {/*//   </ul>*/}
      {/*// </div>*/}
        {hobbies.map((h)=>(
          <Card style={{ width: '18rem',margin:"1rem" }}>
            <Card.Img variant="top" src={h.image} />
            <Card.Body>
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
        ))



        }

      </div>
  )
}
