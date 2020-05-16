import React from 'react';
import AuthForm from '../layout/AuthForm';
import AddNewPost from '../layout/AddNewPost';

const Welcome = ( { uid } ) => (
	<AuthForm>
		<h2>Welcome to Timeline App!</h2>
		<p>Sign in or create an account...</p>
		<AddNewPost uid={ uid } />
	</AuthForm>
);

export default Welcome;