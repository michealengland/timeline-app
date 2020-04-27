import React from 'react';
import TimelinePost from '../components/TimelinePost';

const All = ( { timelinePosts } ) => {

	const posts = Object.entries( timelinePosts );

	console.log( posts );

	return (
		<main>
			{
				Object.entries( timelinePosts ).map( ( data, key ) => (
						<li key={ key }>
							{ data.title }
						</li>
					)
				)
			}
		</main>
	);
};

export default All;