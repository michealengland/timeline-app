import React from 'react';

const TimelinePost = ( { category, date, imageAlt, imageURL, postId, title } ) => (
	<article id={ postId }>
		<h1>{ title }</h1>
		<span>{ category }</span>
		<p>{ date }</p>
		<img src={ imageURL } alt={ imageAlt } />
	</article>
);

export default TimelinePost;