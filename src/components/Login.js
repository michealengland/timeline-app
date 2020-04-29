import React, { useState } from 'react';

const Login = ( { onLogin } ) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = ( e ) => {
		e.preventDefault();
		onLogin(email, password);
	}

	const emailOnchange = ( e ) => {
		setEmail( e.target.value );
	};

	const passwordOnchange = ( e ) => {
		setPassword( e.target.value );
	};

	return (
		<form className="container"
			name="login"
			onSubmit={ handleLogin }
		>
			<p>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					onChange={ emailOnchange }
				/>
			</p>
			<p>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					onChange={ passwordOnchange }
				/>
			</p>
			<div>
				<button
					type="submit"
					disabled={ ! email && ! password }
				>
					Login
				</button>
			</div>
		</form>
	);
};

export default Login;