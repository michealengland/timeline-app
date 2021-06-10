import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Controls from '../atoms/Controls'
import {NavLink} from 'react-router-dom'

const TimelineControls = ({changePostDirection, onChange}) => {
  const [dateDirection, setDateDirection] = useState('normal')
  const [currentTheme, setCurrentTheme] = useState('Light')

  // Update post order direction.
  const sortByDate = () => {
    if (dateDirection === 'normal') {
      setDateDirection('reverse')
    } else {
      setDateDirection('normal')
    }

    // use callback function to sort array.
    changePostDirection(dateDirection)
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
      <button style={style} onClick={sortByDate}>
        {sortDatesLabel}
      </button>
      <button style={style} onClick={toggleTheme}>
        {currentTheme}
      </button>
    </Controls>
  )
}

TimelineControls.propTypes = {
  changePostDirection: PropTypes.func,
  onChange: PropTypes.func,
}

export default TimelineControls
