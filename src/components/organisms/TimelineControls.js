import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Controls from '../atoms/Controls'
import {Link} from 'react-router-dom'

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

  return (
    <Controls>
      <Link style={style} to={`/all`}>
        All
      </Link>
      <Link style={style} to={`/add-new-post`}>
        New Post
      </Link>
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
