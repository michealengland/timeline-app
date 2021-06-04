import React from 'react'
import Login from '../molecules/Login'
import AuthForm from '../organisms/AuthForm'

const SignIn = () => (
  <AuthForm>
    <h2>Welcome to Timeline App!</h2>
    <p>Sign in or create an account...</p>
    <Login />
  </AuthForm>
)

export default SignIn
