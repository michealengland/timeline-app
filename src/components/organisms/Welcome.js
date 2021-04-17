import React from 'react'
import AuthForm from '../organisms/AuthForm'
import AddNewPost from '../organisms/AddNewPost'

const Welcome = ({uid}) => (
  <AuthForm>
    <h2>Welcome to Timeline App!</h2>
    <p>Create your first post to get started...</p>
    <AddNewPost uid={uid} />
  </AuthForm>
)

export default Welcome
