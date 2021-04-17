import React from 'react';
import TimelinePost from "../organisms/TimelinePost";
import PostControls from "../molecules/PostControls";

const Single = (props) => {
	const { date, id, imageURL, slug, timeline, title } = props;

	return (
		<div>
			<PostControls { ...props } />
			<TimelinePost
				date={ date }
				id={ id }
				imageURL={ imageURL }
				slug={ slug }
				timeline={ timeline }
				title={ title }
			/>
		</div>
	);
}

export default Single;