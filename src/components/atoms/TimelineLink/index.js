import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export default function TimelineLink({id, label}) {
  const timelineStyle = {
    fontSize: '1.4em',
    textDecoration: 'none',
  }

  return (
    <span>
      <Link style={timelineStyle} to={`/timelines/timeline${id}`}>
        {label || id}
      </Link>
    </span>
  )
}

TimelineLink.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
}
