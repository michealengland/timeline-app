import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import { format } from 'date-fns';
import { getUserTimelines } from '../../utilities/query';
import MaterialDatePicker from '.././MaterialDatePicker';

const TimelinePostEdit = ( { date, id, imageURL, slug, title, timeline, uid } ) => {
	const [currentTimeline, setCurrentTimeline ] = useState('');

	function formatDate(date) {
		return format(new Date( date ), "iiii, MMMM d, RRRR hh:mm a");
	}

	// Form defaults
	const [editTitle, setEditTitle] = useState(title);
	const [editTimeline, setEditTimeline] = useState(timeline);
	const [editTimelineChoices, setEditTimelineChoices] = useState([]);
	const [editDate, setEditDate] = useState(formatDate(date));
	const [timelines, setTimelines] = useState([]);
	const [selectTimelineID, setSelectTimelineID] = useState('');

	// Set posts on page load.
	useEffect( () => {
		if ( uid !== null ) {
			setEditTimelineChoices( getUserTimelines( uid ) );
		}
	}, [uid]);

	useEffect(() => {
		// Set default for new timeline.
		if ( timelines.length > 0 && timelines[0].timelineID) {
			setSelectTimelineID( timelines[0].timelineID );
		}
	}, []);

	const style = {
		padding: '.2em',
	};

	const timelineStyle = {
		fontSize: '1.4em',
		textDecoration: 'none',
	}

	const onEditSubmit = (e) => {
		e.preventDefault();

		console.log('form submitted')
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
			<form>
				<div style={ style }>
					<div>
						<label htmlFor="edit-title">Post Title</label>
						<input
							name="edit-title"
							value={ editTitle }
							onChange={ (e) => {
								setEditTitle(e.target.value );
							} }
						/>
					</div>

					{/* { currentTimeline && <span><Link style={ timelineStyle } to={`/timelines/timeline${ timeline }`}>{ currentTimeline.label }</Link></span> } */}

					<div>
						<label htmlFor="timeline-select">Assign to different Timeline</label>
						<select
							id="timeline-select"
							onChange={ (newTimeline) => {
								setEditTimeline(newTimeline);
							} }
							value={ editTimeline }
						>
							{ timelines.length > 0 &&
								timelines.map( ( timeline, key ) => (
									<option key={ key } value={ timeline.timelineID }>{ timeline.label }</option>
								) )
							}
						</select>
					</div>

					<div>
						<p><label htmlFor="edit-date">Date</label></p>
						<MaterialDatePicker
							name="edit-date"
							onUpdate={ (newDate) => {
								setEditDate( formatDate(newDate) );
							} }
						/>
					</div>
				</div>
				{ imageURL && <img src={ imageURL } alt={ title } /> }
				<button type="submit" onClick={ onEditSubmit }>Apply Changes</button>
			</form>
		</article>
	);
};

export default TimelinePostEdit;