import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Auth from './pages/auth'
import ParticipatedEvents from './pages/participatedEvents'
import CreateEvent from './pages/createEvent'
import Navbar from './components/navbar'
import {useCookies} from "react-cookie";
import AddHobbies from "./pages/addHobbies";
import YourEvents from "./pages/yourEvents";
import Register from "./pages/register";

function App() {
  const [cookies, setCookies] = useCookies(['access_token'])

  return (
    <div className="App">
      <Router>
        {
          cookies.access_token &&
          <Navbar />
        }

        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/addHobbies" element={<AddHobbies />}></Route>
          <Route path="/yourEvents" element={<YourEvents />}></Route>
          <Route
            path="/participatedEvents"
            element={<ParticipatedEvents />}
          ></Route>
          <Route path="/createEvent" element={<CreateEvent />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
