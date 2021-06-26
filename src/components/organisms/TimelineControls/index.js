import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Controls from '@Atoms/Controls'
import {NavLink} from 'react-router-dom'
import firebase from '@FirebaseApp'
import {useLocation} from "react-router-dom";

export default function TimelineControls({changePostDirection, hasPosts, onChange, onLogout, uid}) {
  const [dateDirection, setDateDirection] = useState('normal')
  const [currentTheme, setCurrentTheme] = useState('Light')
  const location = useLocation();
  const isTimeline = location.pathname === '/' || location.pathname.includes('/timelines')

  // Update post order direction.
  const sortByDate = () => {
    if (! hasPosts) {
      return;
    }

    if (dateDirection === 'normal') {
      setDateDirection('reverse')
    } else {
      setDateDirection('normal')
    }

    // use callback function to sort array.
    changePostDirection(dateDirection)
  }

  const logoutUser = e => {
    e.preventDefault()

    // Sign out user.
    firebase.auth().signOut()

    // Clear userID state.
    onLogout()
  }

  // Button Label.
  const sortDatesLabel =
    dateDirection === 'normal' ? 'Normal Direction' : 'Reverse Direction'

  const toggleTheme = () => {
    if (currentTheme === 'Light') {
      setCurrentTheme('Dark')
    } else if (currentTheme === 'Dark') {
      setCurrentTheme('Light')
    }

    onChange(currentTheme)
  }

  const style = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'inherit',
    fontSize: '1.2em',
    fontWeight: '400',
    marginRight: '10px',
    padding: '0.2em',
    textDecoration: 'none',
  }

  const navStyle = {
    display: 'inline-block',
  }

  return (
    <Controls>
      <nav style={navStyle}>
        <NavLink style={style} to={`/`} activeClassName="selected">
          Timelines
        </NavLink>
        <NavLink style={style} to={`/add-new-post`} activeClassName="selected">
          New Post
        </NavLink>
      </nav>
      {isTimeline && hasPosts &&
        <button style={style} onClick={sortByDate}>
          {sortDatesLabel}
        </button>
      }
      <button style={style} onClick={toggleTheme}>
        {currentTheme}
      </button>
      {!!uid && (
        <button style={style} onClick={logoutUser}>
          Logout
        </button>
      )}
    </Controls>
  )
}

TimelineControls.propTypes = {
  changePostDirection: PropTypes.func,
  hasPosts: PropTypes.bool,
  onChange: PropTypes.func,
  onLogout: PropTypes.func.isRequired,
  uid: PropTypes.string,
}
