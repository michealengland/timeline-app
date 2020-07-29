import firebase from '../firebase';

/**
 * Fetch timelines with matching user ID.
 *
 * @param {string} uid user ID.
 * @returns {Array} Timelines.
 */
const getUserTimelines = ( uid ) => {
	const timelines = [];
	const query = firebase.database().ref("timelines/");

	query.once("value")
		.then( (snapshot) => {
			snapshot.forEach( ( childSnapshot ) => {
				const timelineKey = { 'timelineID': childSnapshot.key };
				const timelineData = Object.assign( timelineKey, childSnapshot.val());

				if ( childSnapshot.val().authorID.valueOf(uid) === uid ) {
					timelines.push( timelineData );
				}
		});
	});

	return timelines;
};

/**
 * Fetch posts with matching user ID.
 *
 * @param {string} uid user ID.
 * @returns {Array} Posts.
 */
const fetchUserPosts = (uid) => {
	const posts = [];
	const query = firebase.database().ref('posts/');

	return new Promise( (resolve) => {
		query.once("value").then( (snapshot) => {
			snapshot.forEach( ( childSnapshot ) => {
				if ( childSnapshot.val().authorID.valueOf(uid) === uid ) {
					posts.push( childSnapshot.val() );
				}
			});

			resolve( posts );
		});
	}, (err) => {
		console.log(err);
	});
}

export { getUserTimelines, fetchUserPosts };