import React from 'react';

const AuthForm = ( { children } ) => {

	const style= {
		border: '1px solid #eee',
		margin: '0 auto',
		maxWidth: '400px',
		padding: '20px',
	}

	return(
		<div style={ style }>
			{ children }
		</div>
	)
};

export default AuthForm;