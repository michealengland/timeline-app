import React from 'react'
import PropTypes from 'prop-types'
import Welcome from '../organisms/Welcome'
import AddNewPost from './AddNewPost'

const NewPost = ({postCount, uid}) =>
  postCount > 0 ? (
    <AddNewPost title="Add New Post" uid={uid} />
  ) : (
    <Welcome uid={uid} />
  )

NewPost.propTypes = {
  postCount: PropTypes.number,
  uid: PropTypes.string,
}

export default NewPost
