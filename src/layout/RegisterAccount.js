import React, { useState } from 'react';
import { createAccount } from '../utilities/write';

const RegisterAccount = ( { onLogin } ) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordAgain, setPasswordAgain] = useState('');

	// Event Handlers.
	const emailOnchange = ( e ) => { setEmail( e.target.value ) };
	const passwordOnchange = ( e ) => { setPassword( e.target.value ) };
	const passwordAgainOnchange = ( e ) => { setPasswordAgain( e.target.value ) };

	// On Sumbit.
	const handleLogin = ( e ) => {
		e.preventDefault();
		createAccount( email, password );
	}

	const passwordMatched = password !== '' && password !== passwordAgain ? 'Passwords do not match.' : 'Passwords matched.';

	return (
		<form className="container"
			name="create-account"
			onSubmit={ handleLogin }
		>
			<p>
				<label htmlFor="email">Account Email:</label>
				<input
					type="email"
					onChange={ emailOnchange }
				/>
			</p>
			<p>
				<label htmlFor="password">Account Password:</label>
				<input
					type="password"
					onChange={ passwordOnchange }
				/>
			</p>

			<p>
				<label htmlFor="password-verify">Verify Password:</label>
				<input
					type="password"
					onChange={ passwordAgainOnchange }
				/>
			</p>

			{ passwordMatched }

			<div>
				<button
					type="submit"
					disabled={ ! email || ! password || password !== passwordAgain }
				>
					Login
				</button>
			</div>
		</form>
	);
};

export default RegisterAccount;