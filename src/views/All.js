import React from 'react';
import TimelinePost from '../components/TimelinePost';

const All = ( { timelinePosts } ) => {
	return (
		<>
			{ timelinePosts.map( ( data, key ) => {
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

export default All;