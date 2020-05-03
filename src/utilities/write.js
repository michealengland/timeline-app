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

const writeNewMedia = ( file, type, posts, authorID ) => {
	firebase.database().ref('media/').push( {
		// VERIFIED PROPERTIES NEED TO GO HERE.
	} );
}

const writeNewPost = ( authorID, date, imageID, title ) => {
	firebase.database().ref('posts/').push( {
		authorID: authorID,
		date: date,
		dateCreated: 'NEED TIMESTAMP FUNCTION',
		imageID: imageID,
		slug: sanitizeHyphenatedSlug( title ),
		title: title,
	} );
}

const writeNewTimeline = ( authorID, label, postID ) => {
	const posts = [];

	// PostID.
	if ( postID ) {
		posts.push( postID );
	}

	firebase.database().ref('timelines/').push( {
		authorID: authorID,
		dateCreated: 'NEED TIMESTAMP FUNCTION',
		label: label,
		posts: posts,
		slug: sanitizeHyphenatedSlug( label ),
	} );
};

export { createAccount, writeNewMedia, writeNewPost, writeNewTimeline };