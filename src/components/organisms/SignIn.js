import React from 'react'
import PropTypes from 'prop-types'
import Login from '../molecules/Login'
import AuthForm from '../organisms/AuthForm'

const SignIn = ({onLogin}) => (
  <AuthForm>
    <h2>Welcome to Timeline App!</h2>
    <p>Sign in or create an account...</p>
    <Login onLogin={onLogin} />
  </AuthForm>
)

SignIn.propTypes = {
  onLogin: PropTypes.func,
}

export default SignIn
