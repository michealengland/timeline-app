import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import firebase from '../../firebase'

const Header = ({onLogout, siteTitle, uid}) => {
  const signOutUser = e => {
    e.preventDefault()

    // Sign out user.
    firebase.auth().signOut()

    // Clear userID state.
    onLogout()
  }

  return (
    <header>
      {uid === null && <Redirect to="/" />}
      <h1>
        <Link to={`/`}>{siteTitle}</Link>
      </h1>
      {firebase.auth().currentUser === null ? (
        <>
          <Link className="bttn-main-control" to={`/`}>
            Login
          </Link>
          <Link className="bttn-main-control" to={`/create-account`}>
            Create Account
          </Link>
        </>
      ) : (
        <button className="bttn-main-control" onClick={signOutUser}>
          Sign Out
        </button>
      )}
    </header>
  )
}

export default Header
