import React from 'react'
import PropTypes from 'prop-types'
import Welcome from '../organisms/Welcome'
import AddNewPost from '../organisms/AddNewPost'

const NewPost = ({postCount, uid}) =>
  postCount > 0 ? <AddNewPost uid={uid} /> : <Welcome uid={uid} />

NewPost.propTypes = {
  postCount: PropTypes.number,
  uid: PropTypes.string,
}

export default NewPost
