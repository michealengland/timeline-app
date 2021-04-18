import React from 'react'
import PropTypes from 'prop-types'
import AuthForm from '../organisms/AuthForm'
import AddNewPost from './AddNewPost'

const Welcome = ({uid}) => (
  <AuthForm>
    <h2>Welcome to Timeline App!</h2>
    <p>Create your first post to get started...</p>
    <AddNewPost uid={uid} />
  </AuthForm>
)

Welcome.propTypes = {
  uid: PropTypes.string,
}

export default Welcome
