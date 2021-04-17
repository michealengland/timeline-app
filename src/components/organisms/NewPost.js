import React from 'react'
import Welcome from '../organisms/Welcome'
import AddNewPost from '../organisms/AddNewPost'

const NewPost = ({postCount, uid}) =>
  postCount > 0 ? <AddNewPost uid={uid} /> : <Welcome uid={uid} />

export default NewPost
