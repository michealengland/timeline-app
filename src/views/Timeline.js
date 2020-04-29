import React from 'react';
import TimelinePost from '../components/TimelinePost';

const Timeline = ( { timelinePosts, currentCategory } ) => {

	// Create array of posts in this Timeline.
	const postsInTimeline = timelinePosts.filter( post => ( post.category === currentCategory ) );

	return (
		<main>
			{ postsInTimeline.map( ( data, key ) => {
				const {
					category,
					date,
					id,
					image: {
						imageAlt,
						imageURL,
					},
					title,
					slug,
				} = data;

				return(
					<TimelinePost
						date={ date }
						imageAlt={ imageAlt }
						imageURL={ imageURL }
						key={ key }
						postId={ id }
						slug={ slug }
						timeline={ category }
						title={ title }
					/>
				);
			} ) }
		</main>
	);
};

export default Timeline;