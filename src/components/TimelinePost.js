import React from 'react';
import { Link } from "react-router-dom";

const TimelinePost = ( { category, date, imageAlt, imageURL, postId, title, slug } ) => (
	<article id={ postId }>
		<h1><Link to={`/post/${ slug }`}>{ title }</Link></h1>
		<span>{ category }</span>
		<p>{ date }</p>
		<img src={ imageURL } alt={ imageAlt } />
	</article>
);

export default TimelinePost;