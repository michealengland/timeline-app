import React from 'react';

const TimelinePost = ( { date, title, category, imageURL, imageAlt } ) => (
	<article>
		<h1>{ title }</h1>
		<span>{ category }</span>
		<p>{ date }</p>
		<image src={ imageURL } alt={ imageAlt } />
	</article>
);

export default TimelinePost;