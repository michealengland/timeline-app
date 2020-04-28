import React from 'react';
import TimelinePost from '../components/TimelinePost';

const All = ( { timelinePosts } ) => {

	// Convert Data Object to Array.
	const posts = Object.entries( timelinePosts );

	return (
		<main>
			{ posts.map( ( data, key ) => {
				// Main object wrapper.
				const postId = data[0];

				// Props.
				const {
					category,
					date,
					image: {
						imageAlt,
						imageURL,
					},
					title,
				} = data[1];

				return(
					<TimelinePost
						category={ category }
						date={ date }
						imageAlt={ imageAlt }
						imageURL={ imageURL }
						key={ key }
						postId={ postId }
						title={ title }
					/>
				);
			} ) }
		</main>
	);
};

export default All;