import React, { useState } from 'react';
import Controls from '../components/Controls';
import AddNewPost from './AddNewPost';

const TimelineControls = () => {
	const [isNewPostActive, setNewPost] = useState(false);

	const addNew = () => {
		console.log( 'New Post is active', isNewPostActive );
		if ( isNewPostActive === false ) {
			setNewPost( true );
		} else {
			setNewPost( false );
		}
	};

	// Button Label.
	const addNewLabel = isNewPostActive ? 'Collapse New Post' : 'Add New Post';

	return (
		<Controls>
			<button onClick={ addNew }>{ addNewLabel }</button>
			{ isNewPostActive ? <AddNewPost /> : '' }
		</Controls>
	);
};

export default TimelineControls;