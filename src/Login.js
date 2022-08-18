import React, { Component } from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import jwt from 'jsonwebtoken'

function App() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    async function loginUser(event) {
      event.preventDefault()
  
      const response = await fetch('http://localhost:1337/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
  
      const data = await response.json()
      console.log(data)

      if(data.user){
        localStorage.clear()
        localStorage.setItem('token', data.user)
        window.location.href = '/event-page'
      }
      else{
        alert('Please check your username and password')
      }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/'}>
              Rivera
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/register'}>
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
          <form onSubmit={loginUser}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
          </div>
        </div>
        </>
    )
  }

export default App