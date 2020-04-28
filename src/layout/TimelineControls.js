import React, { useState } from 'react';
import Controls from '../components/Controls';
import AddNewPost from './AddNewPost';
import filterDates from '../utilities/filterDates';

const TimelineControls = () => {
	const [isNewPostActive, setNewPost] = useState(false);
	const [dateDirection, setDateDirection] = useState('normal');

	// Toggle new post form.
	const addNew = () => {
		console.log( 'New Post is active', isNewPostActive );
		if ( isNewPostActive === false ) {
			setNewPost( true );
		} else {
			setNewPost( false );
		}
	};

	// Update post order direction.
	const sortByDate = () => {
		if ( dateDirection === 'normal' ) {
			setDateDirection( 'reverse' );
		} else {
			setDateDirection( 'normal' );
		}

		let count = [1, 2, 6, 7, 8, 30, 50];

		// Sort Array.
		filterDates( count, dateDirection );
	};

	// Button Label.
	const addNewLabel = isNewPostActive ? 'Collapse New Post' : 'Add New Post';
	const sortDatesLabel = dateDirection === 'normal' ? 'Normal Direction' : 'Reverse Direction';

	return (
		<Controls>
			<button onClick={ addNew }>{ addNewLabel }</button>
			{ isNewPostActive ? <AddNewPost /> : '' }
			<button onClick={ sortByDate }>{ sortDatesLabel }</button>
		</Controls>
	);
};

export default TimelineControls;