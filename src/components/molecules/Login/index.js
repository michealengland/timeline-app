import React, {useState} from 'react'
import PropTypes from 'prop-types'
import firebase from '../../../firebase'
import {Link} from 'react-router-dom'

// Log in user.
function onLogin(email, password) {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      // User must sign themselves out.
      return firebase.auth().signInWithEmailAndPassword(email, password)
    })
    .catch(error => {
      // Handle Errors here.
      console.log(error)
    })
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    onLogin(email, password)
  }

  const emailOnchange = e => {
    setEmail(e.target.value)
  }

  const passwordOnchange = e => {
    setPassword(e.target.value)
  }

  const style = {
    margin: '0 auto',
    maxWidth: '800px',
  }

  return (
    <div style={style}>
      <form className="container" name="login" onSubmit={onSubmit}>
        <p>
          <label htmlFor="email">Email:</label>
          <input
            autoComplete="current-password"
            onChange={emailOnchange}
            type="email"
          />
        </p>
        <p>
          <label htmlFor="password">Password:</label>
          <input
            autoComplete="current-password"
            onChange={passwordOnchange}
            type="password"
          />
        </p>
        <div>
          <button
            className="bttn-main-control"
            disabled={!email && !password}
            type="submit"
          >
            Login
          </button>
          <Link className="bttn-main-control" to={`/create-account`}>
            Create Account
          </Link>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func,
}
