import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
  deletePost,
  deleteMediaFromStorage,
  deletePostFromTimeline,
} from '../../../utilities/delete'
import {Redirect} from 'react-router-dom'

const PostControls = props => {
  const {id, imageURL, timeline, toggleEditing} = props
  const [redirect, setRedirect] = useState(false)

  const onDeleteClick = () => {
    console.log('DELETE POST CLICKED')
    deletePost(id, timeline)
    deletePostFromTimeline(id, timeline)

    if (imageURL) {
      deleteMediaFromStorage(imageURL)
    }

    setRedirect(true)
  }

  return (
    <nav className="post-controls">
      {toggleEditing && <button onClick={toggleEditing}>Edit</button>}
      <button onClick={onDeleteClick}>Delete</button>
      {redirect === true && <Redirect to="/" />}
    </nav>
  )
}

PostControls.propTypes = {
  id: PropTypes.string,
  imageURL: PropTypes.string,
  timeline: PropTypes.object,
  toggleEditing: PropTypes.func,
}

export default PostControls
