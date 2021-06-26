import React from 'react'
import Login from '@Molecules/Login'

export default function SignIn() {
  return (
    <div className="auth-form">
      <h2>Welcome to Timeline App!</h2>
      <p>Sign in or create an account</p>
      <Login />
    </div>
  )
}
