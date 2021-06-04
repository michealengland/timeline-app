import React from 'react'
import PropTypes from 'prop-types'
import Welcome from '../organisms/Welcome'
import AddNewPost from './AddNewPost'

export default function NewPost({hasPosts, uid}) {
  if (hasPosts) {
    return <AddNewPost title="Add New Post" uid={uid} />
  } else {
    return <Welcome uid={uid} />
  }
}

NewPost.propTypes = {
  hasPosts: PropTypes.bool,
  uid: PropTypes.string,
}
