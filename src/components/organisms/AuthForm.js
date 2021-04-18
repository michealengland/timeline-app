import React from 'react'
import PropTypes from 'prop-types'

const AuthForm = ({children}) => {
  const style = {
    border: '1px solid #eee',
    margin: '0 auto',
    maxWidth: '400px',
    padding: '20px',
  }

  return <div style={style}>{children}</div>
}

AuthForm.propTypes = {
  children: PropTypes.node,
}

export default AuthForm
