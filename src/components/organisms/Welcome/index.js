import React from 'react'
import PropTypes from 'prop-types'
import AddNewPost from '../AddNewPost'

export default function Welcome({uid}) {
  return (
    <div className="auth-form">
      <h2>Welcome to Timeline App!</h2>
      <p>Create your first post to get started...</p>
      <AddNewPost uid={uid} />
    </div>
  )
}

Welcome.propTypes = {
  uid: PropTypes.string,
}
