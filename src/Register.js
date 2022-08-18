import React, { Component } from 'react'
import { useEffect,useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'

function App() {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()
    console.log(data)

		if (data.status === 'ok') {
      navigate('/')
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
    <form onSubmit={registerUser}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Full name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Full name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            Register
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/">Login?</a>
        </p>
      </form>
    </div>
  </div>
  </>
    )
  }

export default App