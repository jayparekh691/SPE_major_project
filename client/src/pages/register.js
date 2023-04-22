import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { FRONTEND_URL } from '../config'

const backend = BACKEND_URL

const Register = () => {
  console.log(backend)
  console.log(FRONTEND_URL)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [gender, setGender] = useState('')
  const [mobilenumber, setMobilenumber] = useState('')
  const [district, setDistrict] = useState('')

  const [_, setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(backend + '/auth/register', {
        name,
        username,
        password,
        address,
        district,
        state,
        gender,
        mobilenumber,
      })
      alert('Registration Completed! Login to continue')
      window.location.reload()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="auth-container" style={{ marginTop: '400px' }}>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            required
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            required
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            required
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            required
            type="text"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="district">District:</label>
          <input
            required
            type="text"
            id="district"
            onkeyup="this.value = this.value.toUpperCase();"
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            required
            type="text"
            id="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <div>
            <input
              required
              type="radio"
              id="gender"
              name="gender"
              value="Male"
              onChange={(event) => setGender(event.target.value)}
            />
            Male
            <input
              required
              type="radio"
              id="gender"
              name="gender"
              value="Female"
              onChange={(event) => setGender(event.target.value)}
            />
            Female
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mobilenumber">Mobile number:</label>
          <input
            required
            type="tel"
            id="mobilenumber"
            value={mobilenumber}
            onChange={(event) => setMobilenumber(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
