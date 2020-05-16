import React from 'react';
import TimelinePost from '../components/TimelinePost';
import PostControls from '../components/PostControls';

const Single = (props) => {
	const { date, imageURL, slug, timeline, title } = props;

	return (
		<div>
			<PostControls { ...props } />
			<TimelinePost
				date={ date }
				imageURL={ imageURL }
				slug={ slug }
				timeline={ timeline }
				title={ title }
			/>
		</div>
	);
}

export default Single;