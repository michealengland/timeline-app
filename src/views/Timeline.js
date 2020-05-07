import React from 'react';
import TimelinePost from '../components/TimelinePost';

const Timeline = ( { timelinePosts, currentCategory } ) => {

	// Create array of posts in this Timeline.
	const postsInTimeline = timelinePosts.filter( post => ( post.category === currentCategory ) );

	return (
		<main>
			{ postsInTimeline.map( ( data, key ) => {
				const {
					date,
					dateCreated,
					imageURL,
					slug,
					timeline,
					title,
					uid,
				} = data;

				return(
					<TimelinePost
						date={ date }
						imageURL={ imageURL }
						key={ key }
						slug={ slug }
						timeline={ timeline }
						title={ title }
					/>
				);
			} ) }
		</main>
	);
};

export default Timeline;