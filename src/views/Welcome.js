import React from 'react';
import Login from '../components/Login';
import AuthForm from '../layout/AuthForm';

const Welcome = ( { onLogin } ) => (
	<AuthForm>
		<h2>Welcome to Timeline App!</h2>
		<p>Sign in or create an account...</p>
		<Login onLogin={ onLogin } />
	</AuthForm>
);

export default Welcome;