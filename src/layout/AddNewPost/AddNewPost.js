import React, { useState, useEffect } from 'react';
import ImageUpload from '../../components/ImageUpload';
import { writePostToNewTimeline, writePostToExistingTimeline, uploadMediaToStorage } from '../../utilities/write';
import { getUserTimelines } from '../../utilities/query';
import { Redirect } from 'react-router-dom';
import resizeImage from '../../utilities/jimp/image-manipulation';
import PostDateInput from './PostDateInput'

const AddNewPost = ( { uid } ) => {
	// Set Form States.
	const [date, setDate] = useState( Date.now() );
	const [fileURL, setFileURL] = useState('');
	const [image, setImage] = useState('');
	const [isNewTimeline, setIsNewTimeline] = useState( true );
	const [placeholderURL, setPlaceholderURL] = useState('');
	const [progress, setUploadProgress] = useState(0);
	const [selectTimelineID, setSelectTimelineID] = useState('');
	const [timelineNew, setNewTimeline] = useState('');
	const [timelines, setTimelines] = useState([]);
	const [title, setTitle] = useState('');
	const [submitStatus, setSubmitStatus] = useState( false );

	// Set posts on page load.
	useEffect( () => {
		if ( uid !== null ) {
			setTimelines( getUserTimelines( uid ) );
		}
	}, [uid]);

	// Update select onClick.
	const setFormSelect = ( e ) => {
		setSelectTimelineID( e.target.value );
	}

	// Set state.
	const callback = (resizedImage) => {
		setImage( resizedImage );
		setPlaceholderURL(URL.createObjectURL(resizedImage));
	}

	// resize image and set state.
	const getResizedImage = async (image, callback) => await resizeImage( image, callback );

	// Image upload event handler.
	const uploadMedia = (e) => {
		if( e.target.files[0] ) {
			getResizedImage(e.target.files[0], callback);
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

		// Set default for new timeline.
		if ( timelines.length > 0 && timelines[0].timelineID) {
			setSelectTimelineID( timelines[0].timelineID );
		}
	};

	// Write image to the storage DB.
	async function mediaUploadInit( image, uid ) {
		const newFileURL = await uploadMediaToStorage( image, uid );

		setFileURL( newFileURL );
	}

	// Get Posts Data on userID update.
	useEffect(() => {
		if ( image && fileURL === '' ) {
			mediaUploadInit( image, uid );
		}
	},[fileURL, image, uid]);

	// update date on change.
	const onDateUpdate = ( newDate ) => {
		setDate( newDate );
	}

	/**
	 * On Submit writeNewPost data.
	 *
	 * @param {*} e event.
	 */
	const saveNewPost = ( e ) => {
		e.preventDefault();
		setNewTimeline( timelineNew );
		setTitle( title );

		// Write / Edit timeline to the DB.
		if ( isNewTimeline ) {
			writePostToNewTimeline( uid, date, fileURL, title, timelineNew );
		} else {
			writePostToExistingTimeline( uid, date, fileURL, title, selectTimelineID );
		}

		// Redirect User on Submit.
		setSubmitStatus( true );
	};

	const formStyle = {
		padding: '2em 0.2em',
	}

	const style = {
		margin: '0 auto',
		maxWidth: '800px',
	}

	return(
		<div style={ style }>
			<form style={ formStyle }>
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
						required
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
								required
							/>
						</>
					:
						<>
							<label htmlFor="timeline-select">Select a Timeline</label>
							<select id="timeline-select" onChange={ setFormSelect } value={ selectTimelineID } required>
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

				<PostDateInput onDateChange={onDateUpdate} />

				<button
					disabled={ uid === '' || uid === null || title === '' }
					className="bttn-main-control" type="submit"
					onClick={ saveNewPost }
				>
					Submit
				</button>
				{ submitStatus === true && <Redirect to="/post-success" />}
			</form>
		</div>
	);
};

export default AddNewPost;