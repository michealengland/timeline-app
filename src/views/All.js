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
						slug={ slug }
						category={ category }
						date={ date }
						imageAlt={ imageAlt }
						imageURL={ imageURL }
						key={ key }
						postId={ id }
						title={ title }
					/>
				);
			} ) }
		</main>
	);
};

export default All;