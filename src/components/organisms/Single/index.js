import React, {useState} from 'react'
import PropTypes from 'prop-types'
import TimelinePost from '../TimelinePost'
import PostControls from '../../molecules/PostControls'

export default function Single(props) {
  const [isEditing, setIsEditing] = useState(false)
  const {id} = props

  const toggleEditing = () => setIsEditing(!isEditing)

  return (
    <div id={id}>
      <PostControls {...props} toggleEditing={toggleEditing} />
      <TimelinePost {...props} isEditing={isEditing} />
    </div>
  )
}

Single.propTypes = {
  id: PropTypes.string,
  uid: PropTypes.string.isRequired,
}
