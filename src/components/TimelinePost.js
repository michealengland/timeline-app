import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

const TimelinePost = ( { date, id, imageURL, slug, title, timeline } ) => {
	const [currentTimeline, setCurrentTimeline ] = useState('');

	const style = {
		padding: '.2em',
	};

	const timelineStyle = {
		fontSize: '1.4em',
		textDecoration: 'none',
	}

	useEffect(() => {
		const getTimelineData = async () => {
			const findTimeline = firebase.database().ref( 'timelines/' + timeline );
			findTimeline.on('value', function(snapshot) {

				// Set currentTimeline state.
				if ( currentTimeline === '' ) {
					setCurrentTimeline( snapshot.val() );
				}
			});
		}

		getTimelineData();
	}, [currentTimeline, timeline] );

	return (
		<article>
			<div style={ style }>
				<h1><Link to={`/posts/post${ id }`}>{ title || 'undefined' }</Link></h1>
				{ currentTimeline && <span><Link style={ timelineStyle } to={`/timelines/timeline${ timeline }`}>{ currentTimeline.label }</Link></span> }
				<p>{ date }</p>
			</div>
			{ imageURL && <img src={ imageURL } alt={ title } /> }
		</article>
	);
};

export default TimelinePost;