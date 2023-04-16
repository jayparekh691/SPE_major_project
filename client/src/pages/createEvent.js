import React, { useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export default function CreateEvent() {
  const userID = useGetUserID()
  const [cookies, _] = useCookies(['access_token'])

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

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewEvent({ ...newevent, [name]: value })
    // console.log(name, value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await axios.post(
        'http://localhost:3001/events',
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
    <div className="create-event">
      <h2>Create event</h2>
      <form onSubmit={handleSubmit}>
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
        <input
          type="text"
          id="hobbyname"
          name="hobbyname"
          value={newevent.hobbyname}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="registrationDate">Registration Date Deadline:</label>
        <input
          type="text"
          id="registrationDate"
          name="registrationDate"
          value={newevent.registrationDate}
          onChange={handleChange}
          required
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
        <input
          type="text"
          id="eventDate"
          name="eventDate"
          value={newevent.eventDate}
          onChange={handleChange}
          required
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
