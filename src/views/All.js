import React from 'react';
import TimelinePost from '../components/TimelinePost';

const All = ( { timelinePosts } ) => {
	return (
		<main>
			{ timelinePosts.map( ( data, key ) => {
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

export default All;