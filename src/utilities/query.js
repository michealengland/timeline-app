import firebase from '../firebase';

const getUserTimelines = ( uid ) => {
	const timelines = [];
	const query = firebase.database().ref("timelines/");

	query.once("value")
		.then( (snapshot) => {
			snapshot.forEach( ( childSnapshot ) => {
				const timelineKey = { 'timelineID': childSnapshot.key };
				const timelineData = Object.assign( timelineKey, childSnapshot.val());

				// Get timeline object.
				timelines.push( timelineData );
		});
	});

	return timelines;
};

function isLoggedIn() {
	return new Promise( (resolve ) => {
		firebase.auth().onAuthStateChanged( (user) => {
			if ( user ) {
				// resolve( true );
				resolve( user.uid );
			} else {
				resolve( false );
			}
		});
	});
}

async function getLoginStatus() {
	const result = await isLoggedIn();

	return result;
}


function loopThroughPosts() {
	const posts = [];
	const query = firebase.database().ref("posts/");

	return new Promise( (resolve ) => {
		query.once("value").then( (snapshot) => {
			snapshot.forEach( function( childSnapshot ) {
				posts.push( childSnapshot.val() );
			});

			return resolve( posts );
		});
	});
}

async function getAllPosts() {
	const userTimelines = await loopThroughPosts();

	return userTimelines;
};

async function getAllUserPosts(uid) {
	let userPosts = [];

	// Get posts.
	const posts = await loopThroughPosts();

	if ( posts ) {
		// Filter posts based on user ID.
		userPosts = posts.filter( post => post.authorID === uid );
	}

	return userPosts || posts;
};

export { getUserTimelines, getAllPosts, getAllUserPosts, getLoginStatus };