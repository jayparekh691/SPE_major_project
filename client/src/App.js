import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Auth from './pages/auth'
import ParticipatedEvents from './pages/participatedEvents'
import CreateEvent from './pages/createEvent'
import Navbar from './components/navbar'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
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
