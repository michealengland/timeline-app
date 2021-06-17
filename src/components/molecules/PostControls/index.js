import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
  deletePost,
  deleteMediaFromStorage,
  deletePostFromTimeline,
} from '../../../utilities/delete'
import {Redirect} from 'react-router-dom'

const PostControls = props => {
  const {id, media: {url}, timeline, toggleEditing, uid} = props
  const [redirect, setRedirect] = useState(false)

  const onDeleteClick = () => {
    deletePost(id, uid)
    deletePostFromTimeline(id, uid, timeline)

    if (url) {
      deleteMediaFromStorage(url, uid)
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
  media: PropTypes.shape({
    url: PropTypes.string,
  }),
  timeline: PropTypes.object,
  toggleEditing: PropTypes.func,
  uid: PropTypes.string.isRequired,
}

export default PostControls
