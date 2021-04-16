import React, { useState } from 'react';

const Login = ( { onLogin } ) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = ( e ) => {
		e.preventDefault();
		onLogin( email, password );
	}

	const emailOnchange = ( e ) => {
		setEmail( e.target.value );
	};

	const passwordOnchange = ( e ) => {
		setPassword( e.target.value );
	};

	const style = {
		margin: '0 auto',
		maxWidth: '800px',
	}

	return (
		<div style={ style }>
			<form className="container"
				name="login"
				onSubmit={ onSubmit }
			>
				<p>
					<label htmlFor="email">Email:</label>
					<input
						autoComplete='current-password'
						onChange={ emailOnchange }
						type="email"
					/>
				</p>
				<p>
					<label htmlFor="password">Password:</label>
					<input
						autoComplete='current-password'
						onChange={ passwordOnchange }
						type="password"
					/>
				</p>
				<div>
					<button
						disabled={ ! email && ! password }
						type="submit"
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;