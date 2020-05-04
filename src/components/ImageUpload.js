import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

// { userID, postID }

const ImageUpload = ( { onChange, parentState } ) => {
	const userID = 'testUser';

	// Define storage.
	const storage = firebase.storage();

	// Set state.
	// const [userID, setUserID] = useState('');
	const [image, setImage] = useState();
	const [url, setURL] = useState('');
	const [localURL, setLocalURL] = useState('');
	const [progress, setUploadProgress] = useState();

	// useEffect(() => {
	// 	console.log( 'CHILD parentState BEFORE:', parentState );
	// 	onChange( 'kitty kitty 1234' );
	// 	console.log( 'CHILD parentState AFTER:', parentState );
	// }, [parentState, onChange]);

	// Set Image on button click.
	const uploadMedia = e => {
		if ( e.target.files[0] ) {
			setLocalURL( URL.createObjectURL( e.target.files[0] ) );
			setImage( e.target.files[0] );
		}
	}

	// On image submit.
	const handleUpload = () => {
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
			// Complete.
			storage.ref(`media/${ userID }`).child(image.name).getDownloadURL().then(url => {
				console.log( 'URL VALUE', url);
				setURL( url );
			})
		});
	}

	const uploadStyle = {
		objectFit: 'cover',
		maxWidth: '400px',
	}

	return (
		<div>
			{ progress > 0 && <progress value={ progress || 0 } max="100"/> }
			{ progress === 100 && <p>Upload successful!</p> }
			<br/>
			<label htmlFor="image">Image Upload</label>
			<input
				name="image"
				type="file"
				onChange={ uploadMedia }
			/>
			<button onClick={ handleUpload }>Upload</button>
			<br/>
			{
				<img style={ uploadStyle } src={ url || localURL || 'http://via.placeholder.com/400x300' } alt="Uploaded images" height="300" width="400"/>
			}
		</div>
	);
};

export default ImageUpload;