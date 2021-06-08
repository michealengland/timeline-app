import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import firebase from '../../firebase'
import projectConfig from '../../projectConfig'

const Header = ({onLogout, uid}) => {
  const signOutUser = e => {
    e.preventDefault()

    // Sign out user.
    firebase.auth().signOut()

    // Clear userID state.
    onLogout()
  }

  return (
    <header>
      <h1>
        <Link to={`/`}>{projectConfig.name}</Link>
      </h1>

      {!!uid && (
        <button className="bttn-main-control" onClick={signOutUser}>
          Sign Out
        </button>
      )}
    </header>
  )
}

Header.propTypes = {
  onLogout: PropTypes.func,
  uid: PropTypes.string,
}

export default Header
