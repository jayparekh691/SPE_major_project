import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { useGetUserID } from '../hooks/useGetUserID'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { BACKEND_URL } from '../config'

const backend = BACKEND_URL + '/api'

export default function CreateEvent() {
  const userID = useGetUserID()

  const navigate = useNavigate()
  if (userID === null) navigate('/')
  const [cookies, _] = useCookies(['access_token'])
  const [hobbies, setHobbies] = useState([])
  const [selectedRegistrationDate, setSelectedRegistrationDate] = useState(
    new Date()
  )
  const [selectedEventDate, setSelectedEventDate] = useState(new Date())
  const [newevent, setNewEvent] = useState({
    eventname: '',
    hobbyname: '',
    registrationDate: '',
    location: '',
    district: '',
    state: '',
    description: '',
    eventDate: '',
    minParticipation: 0,
    userOwner: userID,
  })

  useEffect(() => {
    const GetHobbies = async () => {
      console.log('JAY')
      try {
        const response = await axios.get(
          backend + '/events/createdEvents/hobbies/' + userID
        )
        setHobbies(response.data.hobbies)
        console.log(hobbies.length)
      } catch (err) {
        console.error(err.message)
      }
    }
    GetHobbies()
  }, [1])

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewEvent({ ...newevent, [name]: value })
    // console.log(name, value)
  }

  const handleChangeRegistrationDate = (date) => {
    setSelectedRegistrationDate(date)
    let formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`
    newevent.registrationDate = formattedDate
  }

  const handleChangeEventDate = (date) => {
    setSelectedEventDate(date)
    let formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`
    newevent.eventDate = formattedDate
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(
        backend + '/events',
        { ...newevent },
        {
          headers: { authorization: cookies.access_token },
        }
      )

      alert('Event Created')
      navigate('/home')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="auth-form-container">
      <h2>Create event</h2>
      <form className="create-event" onSubmit={handleSubmit}>
        <label htmlFor="eventname">Event Name:</label>
        <input
          type="text"
          id="eventname"
          name="eventname"
          value={newevent.eventname}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="hobbyname">Hobby Name:</label>
        <select
          type="text"
          id="hobbyname"
          name="hobbyname"
          value={newevent.hobbyname}
          onChange={handleChange}
          required
        >
          <option>Select Hobby</option>
          {hobbies?.map((hobby) => {
            return <option>{hobby}</option>
          })}
        </select>
        <br />
        <br />

        <label htmlFor="registrationDate">Registration Date Deadline:</label>

        <DatePicker
          value={selectedRegistrationDate}
          onChange={handleChangeRegistrationDate}
        />
        <br />
        <br />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={newevent.location}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="district">District:</label>
        <input
          type="text"
          id="district"
          name="district"
          value={newevent.district}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={newevent.state}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={newevent.description}
          onChange={handleChange}
          required
        ></textarea>
        <br />
        <br />

        <label htmlFor="eventDate">Event Date:</label>
        <DatePicker
          value={selectedEventDate}
          onChange={handleChangeEventDate}
        />
        <br />
        <br />

        <label htmlFor="minParticipation">Minimum Participation:</label>
        <input
          type="number"
          id="minParticipation"
          name="minParticipation"
          value={newevent.minParticipation}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <button type="submit">Create event</button>
      </form>
    </div>
  )
}
