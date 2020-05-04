import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import ImageUpload from '../components/ImageUpload';
import { writeNewPost, writeNewTimeline } from '../utilities/write';

const AddNewPost = ( { userID } ) => {
	// Placeholder Data.
	const getUserTimelines = () => ['example 1', 'example 2', 'example 3'];
	const newPostID = '1234567';

	// Define Firebase Storage.
	const storage = firebase.storage();

	// Set Form States.
	const [date, setDate] = useState('');
	const [image, setImage] = useState('this is ');
	const [isNewTimeline, setIsNewTimeline] = useState( true );
	const [placeholderURL, setPlaceholderURL] = useState('');
	const [progress, setUploadProgress] = useState(0);
	const [timelineNew, setNewTimeline] = useState('');
	const [title, setTitle] = useState('');
	const [url, setURL] = useState('');

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

	// Image upload write event.
	const writeMediaToStorage = ( image, progress, userID, url ) => {
		// Write Image to DB.
		if ( ! userID ) {
			return console.error( 'UID not provided.' );
		}

		const metadata = {
			contentType: 'image/jpeg',
		};

		const uploadTask = storage.ref(`media/${ userID }/${ image.name }`).put(image, metadata);

		uploadTask.on('state_changed',
		(snapshot) => {
			// Upload Progress.
			const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			setUploadProgress( progress );
		},
		(error) => {
			// Upload Error.
			console.error(error);
		},
		() => {
			console.log( 'witeMEDIA STARTED' );
			// Complete.
			storage.ref(`media/${ userID }`).child(image.name).getDownloadURL().then( mediaURL => {
				console.log( 'URL VALUE', mediaURL);
				setURL( mediaURL );
			})
		});
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
		writeMediaToStorage( image, progress, userID, url );

		// Write post to the DB.
		writeNewPost( userID, date, url, title );

		// Write / Edit timeline to the DB.
		if ( isNewTimeline ) {
			console.log( 'NEW TIMELINE CREATED' );
			writeNewTimeline( userID, timelineNew, newPostID );
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
						<select id="timeline-select">
							{
								getUserTimelines().map( ( timeline, key ) => (
									<option key={ key } value={ timeline }>{ timeline }</option>
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