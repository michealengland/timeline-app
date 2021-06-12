import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
  deletePost,
  deleteMediaFromStorage,
  deletePostFromTimeline,
} from '../../../utilities/delete'
import updatePost from '../../../utilities/updatePost'
import {Redirect} from 'react-router-dom'

const PostControls = props => {
  const {id, imageURL, timeline} = props

  console.log('PROPS', props)

  const [redirect, setRedirect] = useState(false)

  const editPost = () => {
    updatePost(id, {
      title: 'Palm Trees',
      slug: 'palm-trees',
    })
  }

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
      <button onClick={editPost}>Edit</button>
      <button onClick={onDeleteClick}>Delete</button>
      {redirect === true && <Redirect to="/" />}
    </nav>
  )
}

PostControls.propTypes = {
  id: PropTypes.string,
  imageURL: PropTypes.string,
  timeline: PropTypes.object,
}

export default PostControls
