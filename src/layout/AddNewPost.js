import React, { useState, useEffect } from 'react';
import ImageUpload from '../components/ImageUpload';
import { writePostToNewTimeline, writePostToExistingTimeline, uploadMediaToStorage } from '../utilities/write';
import { getUserTimelines } from '../utilities/query';
import { Redirect } from 'react-router-dom';
import MaterialDatePicker from '../components/MaterialDatePicker';
import Jimp from 'jimp';

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

	// Image upload event handler.
	const uploadMedia = e => {
		if( e.target.files[0] ) {
			console.log(e.target.files[0]);
			console.log('original img url', URL.createObjectURL(e.target.files[0]))

			const imageName = e.target.files[0].name;

			Jimp.read( URL.createObjectURL( e.target.files[0] ) )
			.then(lenna => {
				console.log('lenna', lenna);
				const value = lenna
					.scaleToFit(650, 650)
					.quality(95) // set JPEG quality
					.greyscale() // set greyscale
					.getBase64(Jimp.AUTO, (err, b64Data) => {
						console.log('Non-encoded b64Data', b64Data);
						const b64DataEncoded = window.btoa(b64Data);
						const b64DataDecoded = window.atob(b64DataEncoded);

						console.log('b64DataEncoded', b64DataEncoded);
						console.log('b64DataDecoded', b64DataDecoded);

						// Convert b64Data to blob.
						const blob = new Blob([b64Data], {
							type : 'image/jpeg'
						});
						console.log('blob', blob);

						setPlaceholderURL(b64DataDecoded); // Set placeholder.

						// Convert blob to file.
						const optimizedImage = new File([blob], imageName, {
							type: blob.type,
						});

						console.log('optimizedImage', optimizedImage);
						// Placeholder works if the set the value is `b64DataDecoded`.
						// optimizedImage does not reference a true image even though
						// the object looks correct.
						setPlaceholderURL(URL.createObjectURL( b64DataDecoded ));
						setImage(optimizedImage);             // Set image to upload.
					});

				return value;
			})
			.catch(err => {
				console.error(err);
			});

			// Original functionality.
			// setPlaceholderURL( URL.createObjectURL( e.target.files[0] ) );
			// setImage( e.target.files[0] );
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
				<div>
					<p><label htmlFor="date">Date</label></p>
					<MaterialDatePicker
						name="date"
						onUpdate={ onDateUpdate }
					/>
				</div>
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