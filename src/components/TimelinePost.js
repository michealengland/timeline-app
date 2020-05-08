import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

const TimelinePost = ( { date, imageURL, slug, title, timeline } ) => {
	const [currentTimeline, setCurrentTimeline ] = useState('');

	const style = {
		padding: '.2em',
	};

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
				<h1><Link to={`/post/${ slug }`}>{ title }</Link></h1>
				<span><Link to={`/timeline/${ currentTimeline.slug }`}>{ currentTimeline.label }</Link></span>
				<p>{ date }</p>
			</div>
			{
				imageURL && <img src={ imageURL } alt={ title } />
			}
		</article>
	);
};

export default TimelinePost;