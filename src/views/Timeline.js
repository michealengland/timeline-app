import React from 'react';
import TimelinePost from '../components/TimelinePost';

const Timeline = ( { timelinePosts, timeline} ) => {
	// Create array of posts in this Timeline.
	const postsInTimeline = timelinePosts.filter( post => ( post.timeline === timeline) );

	return (
		<>
			{ postsInTimeline.map( ( data, key ) => {
				const {
					date,
					imageURL,
					slug,
					timeline,
					title,
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
		</>
	);
};

export default Timeline;