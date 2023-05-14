import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar() {
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies(['access_token'])
  const logout = () => {
    setCookies('access_token', '')
    window.localStorage.removeItem('userID')
    navigate('/')
  }
  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant={"dark"}>
          <Navbar.Toggle aria-controls="navbarScroll"/>
          <Navbar.Collapse id="navbarScroll">
              <Nav>
                  <Nav.Link eventKey="1" as={Link} to="/home">Home</Nav.Link>
                  <Nav.Link eventKey="2" as={Link} to="/addHobbies">Add hobbies</Nav.Link>
                  <Nav.Link eventKey="3" as={Link} to="/createEvent">Create Event</Nav.Link>
                  <Nav.Link eventKey="4" as={Link} to="/yourEvents">Your Events</Nav.Link>
                  <Nav.Link eventKey="5" as={Link} to="/participatedEvents">Participated Events</Nav.Link>
              </Nav>
          </Navbar.Collapse>
          <Button
              onClick={logout}
              variant="outline-danger"
          >
              Logout
          </Button>
      </Navbar>

  )
}
