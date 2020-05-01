import React, { useState } from 'react';
import firebase from '../firebase';

const CreateAccount = ( { onLogin } ) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordAgain, setPasswordAgain] = useState('');

	const writeNewUser = ( email, password ) => {
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			console.log( 'errorCode', errorCode );
			console.log( 'errorMessage', errorMessage );
			// ...
		});
	}

	const handleLogin = ( e ) => {
		e.preventDefault();
		writeNewUser(email, password);
	}

	const emailOnchange = ( e ) => {
		setEmail( e.target.value );
	};

	const passwordOnchange = ( e ) => {
		setPassword( e.target.value );
	};

	const passwordAgainOnchange = ( e ) => {
		setPasswordAgain( e.target.value );
	};

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

export default CreateAccount;