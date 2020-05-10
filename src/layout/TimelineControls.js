import React, { useState, useEffect } from 'react';
import Controls from '../components/Controls';
import AddNewPost from './AddNewPost';
import filterDates from '../utilities/filterDates';

const TimelineControls = ( { onChange, theme, uid } ) => {
	const [isNewPostActive, setNewPost] = useState(false);
	const [dateDirection, setDateDirection] = useState('normal');
	const [currentTheme, setCurrentTheme] = useState( 'Light' );

	// Toggle new post form.
	const addNew = () => {
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

	const toggleTheme = () => {
		if ( currentTheme === 'Light' ) {
			setCurrentTheme( 'Dark' );
		} else if ( currentTheme === 'Dark' ) {
			setCurrentTheme( 'Light' );
		}

		onChange( currentTheme );
	}

	const style = {
		backgroundColor: 'transparent',
		border: 'none',
		color: 'inherit',
		fontSize: '1.2em',
		fontWeight: '600',
		marginRight: '10px',
		padding: '0.2em',
	};

	return (
		<Controls>
			<button style={ style } onClick={ addNew }>{ addNewLabel }</button>
			<button style={ style } onClick={ sortByDate }>{ sortDatesLabel }</button>
			<button style={ style } onClick={ toggleTheme }>{ currentTheme }</button>
			{ isNewPostActive ? <AddNewPost uid={ uid } /> : '' }
		</Controls>
	);
};

export default TimelineControls;