import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
  deletePost,
  deleteMediaByUrlFromStorage,
  deletePostFromTimeline,
} from '../../../utilities/delete'
import {Redirect} from 'react-router-dom'

export default function PostControls (props) {
  const {id, media, timelines, toggleEditing, uid} = props
  const [redirect, setRedirect] = useState(false)

  const onDeleteClick = () => {
    deletePost(id, uid)
    deletePostFromTimeline(id, uid, timelines)

    if (media && media.url) {
      deleteMediaByUrlFromStorage(media.url, uid)
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
  timelines: PropTypes.object,
  toggleEditing: PropTypes.func,
  uid: PropTypes.string.isRequired,
}
