/**
 * Functions in charge of writing to the DB.
 *
 * All functions and props are listed alphabetically.
 */

import firebase from '../firebase';

const createAccount = ( email, password ) => {
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;

		console.log( 'errorCode', errorCode );
		console.log( 'errorMessage', errorMessage );
	});
}

const writeNewMedia = ( { file, type, posts, authorID } ) => {
	firebase.database().ref('media/').push( {
		// VERIFIED PROPERTIES NEED TO GO HERE.
	} );
}

const writeNewPost = ( { authorID, date, dateCreated, imageID, slug, title } ) => {
	firebase.database().ref('posts/').push( {
		authorID: '123',
		date: '04032020',
		dateCreated: '04042020',
		imageID: 'EXIMGID',
		slug: 'all-lowercase-hyphenated',
		title: 'This is a sample post',
	} );
}

const writeNewTimeline = ( { authorID, label, posts, slug} ) => {
	firebase.database().ref('timelines/').push( {
		authorID: '123',
		label: 'Timeline Name',
		posts: [1, 2, 3, 4, 5],
		slug: 'timeline-name',
	} );
};

export { createAccount, writeNewMedia, writeNewPost, writeNewTimeline };