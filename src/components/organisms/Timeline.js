import React, { useState, useEffect } from "react";
import TimelinePost from "../organisms/TimelinePost";

const Timeline = ( { timelinePosts, timeline, uid } ) => {
	const [isLoaded, setIsLoaded] = useState(false);

	// Check if posts are loaded.
	useEffect(() => {
		if ( uid !== null && timelinePosts.length > 0 ) {
			setIsLoaded(true);
		}
	}, [isLoaded, timelinePosts, uid]);

	const loadingStyle = {
		opacity: isLoaded ? 1 : 0,
		transition: 'opacity 300ms linear',
	}

	// Create array of posts in this Timeline.
	const postsInTimeline = timelinePosts.filter( post => ( post.timeline === timeline) );

	return (
		<>
			{ postsInTimeline.map( ( data, key ) => {
				const {
					date,
					id,
					imageURL,
					slug,
					timeline,
					title,
					uid
				} = data;

				return(
					<TimelinePost
						date={ date }
						id={ id }
						imageURL={ imageURL }
						key={ key }
						slug={ slug }
						style={ loadingStyle }
						timeline={ timeline }
						title={ title }
					/>
				);
			} ) }
		</>
	);
};

export default Timeline;