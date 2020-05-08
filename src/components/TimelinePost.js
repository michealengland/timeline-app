import React from 'react';
import { Link } from "react-router-dom";

const TimelinePost = ( { date, imageURL, slug, title, timeline } ) => {
	const style = {
		padding: '.2em',
	};

	return (
		<article>
			<div style={ style }>
				<h1><Link to={`/post/${ slug }`}>{ title }</Link></h1>
				<span><Link to={`/timeline/${ timeline }`}>{ timeline }</Link></span>
				<p>{ date }</p>
			</div>
			{
				imageURL && <img src={ imageURL } alt={ title } />
			}
		</article>
	);
};

export default TimelinePost;