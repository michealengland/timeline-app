import React, { useState, useEffect } from 'react';
import ImageUpload from '../components/ImageUpload';
import { writePostToNewTimeline, writePostToExistingTimeline, uploadMediaToStorage } from '../utilities/write';
import { getUserTimelines } from '../utilities/query';

const AddNewPost = ( { uid } ) => {
	// Set Form States.
	const [date, setDate] = useState( Date.now() );
	const [fileURL, setFileURL] = useState('');
	const [image, setImage] = useState('');
	const [isNewTimeline, setIsNewTimeline] = useState( true );
	const [placeholderURL, setPlaceholderURL] = useState('');
	const [progress, setUploadProgress] = useState(0);
	const [timeline, setTimeline] = useState();
	const [timelineNew, setNewTimeline] = useState('');
	const [timelines, setTimelines] = useState();
	const [title, setTitle] = useState('');

	// Set posts on page load.
	useEffect( () => {
		const timelines = getUserTimelines();

		setTimelines( timelines );
	}, []);

	const setFormSelect = ( e ) => {
		console.log( 'formselect', e.target.value );

		setTimeline( e.target.value );
	}

	// Image upload event handler.
	const uploadMedia = e => {
		if( e.target.files[0] ) {
			setPlaceholderURL( URL.createObjectURL( e.target.files[0] ) );
			setImage( e.target.files[0] );
		}
	}

	// Reset Image Upload.
	const resetMedia = () => {
		setImage('');
		setPlaceholderURL('');
	}

	// Toggle isNewTimeline on checkbox click.
	const toggleNewTimeline = () => {
		if ( isNewTimeline === true ) {
			setIsNewTimeline( false );
		} else {
			setIsNewTimeline( true );
		}
	};

	/**
	 * On Submit writeNewPost data.
	 *
	 * @param {*} e event.
	 */
	const saveNewPost = ( e ) => {
		e.preventDefault();
		setNewTimeline( timelineNew );
		setDate( date );
		setTitle( title );

		// Write image to the storage DB.
		// writeMediaToStorage( image, progress, uid, fileURL );
		async function mediaUploadInit() {

			const newFileURL = await uploadMediaToStorage( image, uid );

			console.log( 'newFILE', newFileURL );

			console.log( 'fileURL', fileURL );
		}

		mediaUploadInit();

		console.log( 'fileURL', fileURL );

		// Write / Edit timeline to the DB.
		if ( isNewTimeline ) {
			writePostToNewTimeline( uid, date, fileURL, title, timelineNew );
		} else {
			writePostToExistingTimeline( uid, date, fileURL, title, timeline );
		}
	};

	return(
		<form>
			<h1>Add New Post</h1>
			<div>
				<label htmlFor="title">Title (3 to 60 characters):</label>
				<input
					id="title"
					maxLength="60"
					minLength="3"
					name="title"
					onChange={ (e) => { setTitle( e.target.value ) } }
					type="text"
					value={ title }
				/>
			</div>

			<div>
				<label htmlFor="new-timeline">Where would you like to add this post?</label><br />
				<input
					checked={ isNewTimeline }
					id="existing-timeline"
					name="timeline-assign"
					onChange={ toggleNewTimeline }
					type="checkbox"
				/>
				<label htmlFor="existing-timeline">Use New Timeline</label><br />
			</div>

			<div>
				{ isNewTimeline === true ?
					<>
						<label htmlFor="category">New Timeline Name</label>
						<input
							id="category"
							maxLength="20"
							minLength="3"
							name="category"
							onChange={ (e) => { setNewTimeline( e.target.value ) } }
							type="text"
							value={ timelineNew }
						/>
					</>
				:
					<>
						<label htmlFor="timeline-select">Select a Timeline</label>
						<select id="timeline-select" onChange={ setFormSelect }>
							{ timelines.length > 0 &&
								timelines.map( ( timeline, key ) => (
									<option key={ key } value={ timeline.timelineID }>{ timeline.label }</option>
								) )
							}
						</select>
					</>
				}
			</div>
			<ImageUpload
				placeholderURL={ placeholderURL }
				progress={ progress }
				onChange={ uploadMedia }
				resetMedia={ resetMedia }
			/>
			<div>
				<label htmlFor="date">Post Display Date</label>
				<input
					id="date"
					name="date"
					onChange={ (e) => (setDate( e.target.value ) ) }
					type="date"
					value={ date }
				/>
			</div>
			<button type="submit" onClick={ saveNewPost }>Submit</button>
		</form>
	);
};

export default AddNewPost;