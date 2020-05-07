import React from 'react';
import Login from '../components/Login';

const Welcome = () => {

	const style= {
		margin: '0 auto',
		maxWidth: '400px',
		padding: '20px',
		border: '1px solid #eee',
	}

	return(
		<>
			<div
				style={ style }
			>
			<h2>Welcome to Timeline App!</h2>
			<p>Sign in or create an account...</p>
			<Login />
			</div>
		</>
	)
};

export default Welcome;