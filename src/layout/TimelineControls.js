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

	return (
		<Controls>
			<button onClick={ addNew }>Add New</button>
			{ isNewPostActive ? <AddNewPost /> : '' }
		</Controls>
	);
};

export default TimelineControls;