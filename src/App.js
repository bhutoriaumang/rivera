import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './Login'
import SignUp from './Register'
import EventPage from './EventPage'
import Map from './Map'
function App() {
  return (
    <Router>
      <div className="App">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/event-page" element={<EventPage />} />
              <Route path="/map" element={<Map />} />
            </Routes>
      </div>
    </Router>
  )
}
export default App