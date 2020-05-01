import React from 'react';
import { Link } from "react-router-dom";

const Header = ( { siteTitle } ) => (
	<header>
		<h1><Link to={`/`}>{ siteTitle }</Link></h1>
		<Link to={`/login`}>Login</Link>
		<Link to={`/create-account`}>Create Account</Link>
	</header>
);

export default Header;