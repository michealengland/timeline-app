import React from 'react';
import TimelinePost from '../components/TimelinePost';

const All = ( { timelinePosts } ) => {
	console.log( 'ALL timelinePosts', timelinePosts );

	return (
		<main>
			{ timelinePosts.map( ( data, key ) => {
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

export default All;