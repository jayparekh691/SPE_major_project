import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies(['access_token'])
  const logout = () => {
    setCookies('access_token', '')
    window.localStorage.removeItem('userID')
    navigate('/')
  }
  return (
    <div className="navbar">

            <Link to="/home">Home</Link>
        <Link to="/addHobbies">Add hobbies</Link>
        <Link to="/createEvent">Create Event</Link>
        <Link to="/participatedEvents">Participated Events</Link>
        <button onClick={logout}>Logout</button>
    </div>
  )
}
