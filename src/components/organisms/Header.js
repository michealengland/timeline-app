import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
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
      <h1>
        <Link to={`/`}>{siteTitle}</Link>
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
  siteTitle: PropTypes.string,
  uid: PropTypes.string,
}

export default Header
