import React from 'react'
import PropTypes from 'prop-types'
import TimelinePost from '../organisms/TimelinePost'
import PostControls from '../molecules/PostControls'

const Single = props => {
  const {id} = props;

  return (
    <div id={id}>
      <PostControls {...props} />
      <TimelinePost {...props} />
    </div>
  )
}

Single.propTypes = {
  id: PropTypes.string,
}

export default Single
