import React, { useState } from 'react';
import Controls from '../components/Controls';
import filterDates from '../utilities/filterDates';
import { Link } from 'react-router-dom';

const TimelineControls = ( { onChange, theme, uid } ) => {
	const [dateDirection, setDateDirection] = useState('normal');
	const [currentTheme, setCurrentTheme] = useState( 'Light' );

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
		fontWeight: '400',
		marginRight: '10px',
		padding: '0.2em',
		textDecoration: 'none',
	};

	return (
		<Controls>
			<Link style={ style } to={`/all`}>All</Link>
			<Link style={ style } to={`/add-new-post`}>New Post</Link>
			<button style={ style } onClick={ sortByDate }>{ sortDatesLabel }</button>
			<button style={ style } onClick={ toggleTheme }>{ currentTheme }</button>
		</Controls>
	);
};

export default TimelineControls;