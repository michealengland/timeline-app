import React from 'react';
import TimelinePost from '../components/TimelinePost';

const Timeline = ( { timelinePosts, timeline} ) => {

	console.log( 'Timeline.js timelineID', timeline );

	// Create array of posts in this Timeline.
	const postsInTimeline = timelinePosts.filter( post => ( post.timeline === timeline) );

	console.log( 'posts in timeline', postsInTimeline );

	return (
		<>
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
		</>
	);
};

export default Timeline;