import React from 'react'
import Login from '../molecules/Login'
import AuthForm from '../organisms/AuthForm'

const SignIn = ({onLogin}) => (
  <AuthForm>
    <h2>Welcome to Timeline App!</h2>
    <p>Sign in or create an account...</p>
    <Login onLogin={onLogin} />
  </AuthForm>
)

export default SignIn
