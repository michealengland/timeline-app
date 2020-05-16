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
	if ( uid === '' ) {
		return console.error( 'NO UID PROVIDED' );
	}

	// Get a key for a new Post.
	const newPostKey = firebase.database().ref().child('posts').push().key;
	const newTimelineKey = firebase.database().ref().child('posts').push().key;

	// A post entry.
	const postData = {
		authorID: uid,
		date: date,
		dateCreated: date,
		imageURL: imageURL,
		id: newPostKey,
		slug: sanitizeHyphenatedSlug( title ),
		timeline: newTimelineKey,
		title: title,
	};

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
	if ( uid === '' ) {
		return console.error( 'NO UID PROVIDED' );
	}

	// Get a key for a new Post.
	const newPostKey = firebase.database().ref().child('posts').push().key;

	// A post entry.
	var postData = {
	  authorID: uid,
	  date: date,
	  dateCreated: date,
	  imageURL: imageURL,
	  id: newPostKey,
	  slug: sanitizeHyphenatedSlug( title ),
	  timeline: timelineKey,
	  title: title,
	};

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

async function UPLOAD_IMAGES( file, uid ) {
	// Assign a timestamp to randomize file name.
	const date = Date.now();

	try {
		const storageRef = firebase.storage().ref();

		// Create the file metadata
		const metadata = {
			contentType: "image/jpeg"
		};

		const fileRef = storageRef.child(`media/${ uid }/${ date + '-' + file.name }`);
		const uploadTaskSnapshot = await fileRef.put(file, metadata);
		const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

		return downloadURL;
	} catch (error) {
		console.error( error );
	}
}

async function uploadMediaToStorage( file, uid ) {
	const newMediaURL = await UPLOAD_IMAGES( file, uid );
	console.log( 'BEFORE RETURN', newMediaURL );

	return newMediaURL;
}


export { createAccount, writePostToNewTimeline, writePostToExistingTimeline, uploadMediaToStorage };