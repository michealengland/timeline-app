import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const TimelinePost = ( { authorID, dateCreated, label, posts, slug, timelineID, } ) => {
	const style = {
		padding: '.2em',
	};

	const timelineStyle = {
		fontSize: '1.4em',
		textDecoration: 'none',
	}

	return (
		<article>
			<div id={ slug } style={ style }>
				<h1><Link style={ timelineStyle } to={`/timelines/timeline${ timelineID }`}>{ label }</Link></h1>
				<p>{ format(new Date( dateCreated ), "iiii, MMMM d, RRRR hh:mm a") }</p>
			</div>
		</article>
	);
};

export default TimelinePost;