import React from 'react';
import { Link } from "react-router-dom";

const TimelinePost = ( { date, imageURL, slug, title, timeline } ) => (
	<article>
		<h1><Link to={`/post/${ slug }`}>{ title }</Link></h1>
		<span><Link to={`/timeline/${ timeline }`}>{ timeline }</Link></span>
		<p>{ date }</p>
		{
			imageURL && <img src={ imageURL } />
		}
	</article>
);

export default TimelinePost;