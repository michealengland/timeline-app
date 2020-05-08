import React from 'react';
import Login from '../components/Login';

const Welcome = ( { onLogin } ) => {

	const style= {
		border: '1px solid #eee',
		margin: '0 auto',
		maxWidth: '400px',
		padding: '20px',
	}

	return(
		<>
			<div
				style={ style }
			>
			<h2>Welcome to Timeline App!</h2>
			<p>Sign in or create an account...</p>
			<Login onLogin={ onLogin } />
			</div>
		</>
	)
};

export default Welcome;