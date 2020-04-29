import React from 'react';
import { Link } from "react-router-dom";

const TimelinePost = ( { date, imageAlt, imageURL, postId, slug, timeline, title } ) => (
	<article id={ postId }>
		<h1><Link to={`/post/${ slug }`}>{ title }</Link></h1>
		<span><Link to={`/timeline/${ timeline }`}>{ timeline }</Link></span>
		<p>{ date }</p>
		<img src={ imageURL } alt={ imageAlt } />
	</article>
);

export default TimelinePost;