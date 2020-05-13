import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => (
	<>
		<h1>New Post Created.</h1>
		<p>View <Link to={`/`}>All Posts</Link></p>
	</>
);

export default Success;