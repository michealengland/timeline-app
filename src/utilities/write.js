/**
 * Functions in charge of writing to the DB.
 *
 * All functions and props are listed alphabetically.
 */

import firebase from '../firebase';
import { sanitizeHyphenatedSlug } from './sanitize-fields';

const createAccount = ( email, password ) => {
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;

		console.log( 'errorCode', errorCode );
		console.log( 'errorMessage', errorMessage );
	});
}

function writePostToNewTimeline( uid, date, imageURL, title, label ) {
	console.log( 'imageURL writePostToNewTimeline:', imageURL );

	// A post entry.
	var postData = {
		authorID: uid,
		date: date,
		dateCreated: date,
		imageURL: imageURL,
		slug: sanitizeHyphenatedSlug( title ),
		title: title,
	};

	// Get a key for a new Post.
	const newPostKey = firebase.database().ref().child('posts').push().key;
	const newTimelineKey = firebase.database().ref().child('posts').push().key;

	// New Timeline Entry
	const timelineData = {
		authorID: uid,
		dateCreated: date,
		label: label,
		slug: sanitizeHyphenatedSlug( label ),
		posts: {
			[newPostKey]: {
				id: newPostKey
			}
		},
	}

	// Write the new post's data simultaneously in the posts list and the user's post list.
	var updates = {};

	// Create a new post under /posts.
	updates[`/posts/${ newPostKey }`] = postData;

	// Create a new timeline under /timelines/ + key
	updates[`/timelines/${ newTimelineKey }`] = timelineData;

	return firebase.database().ref().update(updates);
}

function writePostToExistingTimeline( uid, date, imageURL, title, timelineKey ) {
	console.log( 'writePostToExistingTimeline:', imageURL );

	// A post entry.
	var postData = {
	  authorID: uid,
	  date: date,
	  dateCreated: date,
	  imageURL: imageURL,
	  slug: sanitizeHyphenatedSlug( title ),
	  title: title,
	};

	// Get a key for a new Post.
	var newPostKey = firebase.database().ref().child('posts').push().key;

	// New Timeline Entry
	const timelineData = {
		id:	newPostKey
	};

	// Write the new post's data simultaneously in the posts list and the user's post list.
	var updates = {};

	// Create a new post under /posts.
	updates[`/posts/${ newPostKey }`] = postData;

	// Insert new post data under timelines/timeline/posts/
	updates[`/timelines/${ timelineKey }/posts/${ newPostKey }/`] = timelineData;

	return firebase.database().ref().update(updates);
}


const uploadMediaToStorage = ( file, uid ) => {
	// File or Blob named mountains.jpg
	if ( ! file || ! uid ) {
		return;
	}

	const storageRef = firebase.storage().ref();

	// Create the file metadata
	const metadata = {
		contentType: 'image/jpeg'
	};

	// Upload file and metadata to the object 'images/mountains.jpg'
	const uploadTask = storageRef.child(`media/${ uid }/${ file.name }`).put(file, metadata);

	// Listen for state changes, errors, and completion of the upload.
	uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
	function(snapshot) {
		// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log('Upload is ' + progress + '% done');
		// eslint-disable-next-line default-case
		switch (snapshot.state) {
		case firebase.storage.TaskState.PAUSED: // or 'paused'
			console.log('Upload is paused');
			break;
		case firebase.storage.TaskState.RUNNING: // or 'running'
			console.log('Upload is running');
			break;
		}
	}, function(error) {

	// A full list of error codes is available at
	// https://firebase.google.com/docs/storage/web/handle-errors
	// eslint-disable-next-line default-case
	switch (error.code) {
		case 'storage/unauthorized':
		// User doesn't have permission to access the object
		break;

		case 'storage/canceled':
		// User canceled the upload
		break;

		case 'storage/unknown':
		// Unknown error occurred, inspect error.serverResponse
		break;
	}
	}, function() {
	// Upload completed successfully, now we can get the download URL
	uploadTask.snapshot.ref.getDownloadURL().then( function(downloadURL) {
		console.log('File available at', downloadURL);
	});
	});
}



export { createAccount, writePostToNewTimeline, writePostToExistingTimeline, uploadMediaToStorage };