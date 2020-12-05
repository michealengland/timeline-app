import React, {useState} from 'react';
import TimelinePost from '../components/TimelinePost';
import PostControls from '../components/PostControls';

const Single = (props) => {
	const { date, id, imageURL, slug, timeline, title } = props;
	const [isEditing, setIsEditing] = useState(false)

	const editPost = (value) => {
		setIsEditing(value)
	}

	return (
		<div>
			<PostControls { ...props } editPost={editPost}/>
			<TimelinePost
				date={ date }
				id={ id }
				imageURL={ imageURL }
				isEditing={ isEditing }
				slug={ slug }
				timeline={ timeline }
				title={ title }
			/>
		</div>
	);
}

export default Single;