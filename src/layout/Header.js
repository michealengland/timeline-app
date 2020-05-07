import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../firebase';

const Header = ( { siteTitle, uid } ) => {

	const [loggedIn, setIsLoggedIn ] = useState( uid );

	const signOutUser = ( e ) => {
		e.preventDefault();
		setIsLoggedIn( false );

		firebase.auth().signOut();
	}

	return (
		<header>
			<h1><Link to={`/`}>{ siteTitle }</Link></h1>
			{
				! loggedIn ?
				<>
					<Link to={`/login`}>Login</Link>
					<Link to={`/create-account`}>Create Account</Link>
				</>
				: <button onClick={ signOutUser }>Sign Out</button>
			}

		</header>
	)
};

export default Header;