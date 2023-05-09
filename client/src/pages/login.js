import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { BACKEND_URL } from '../config'

const backend = BACKEND_URL + '/api'

export const validateInput = (str = '') => str.includes('@')

export default function Login() {
  // console.log(backend)
  const [_, setCookies] = useCookies(['access_token'])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const result = await axios.post(backend + '/auth/login', {
        username,
        password,
      })
      setCookies('access_token', result.data.token)
      window.localStorage.setItem('userID', result.data.userID)
      navigate('/home')
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  return (
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
              required
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
              required
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here.</button>
      </div>
  )
}