import firebase from '../firebase';

/**
 * Fetch timelines with matching user ID.
 *
 * @param {string} uid user ID.
 * @returns {Array} Timelines.
 */
const getUserTimelines = ( uid ) => {
	return firebase.database().ref("timelines/").once('value')
		.then( (snapshot) => {
			const userTimelines = []
			// Only want to return userTimelines that have matching `authorID: uid`
			snapshot.forEach( ( childSnapshot ) => {
				// Return early if missing authorID.
				if (! childSnapshot.hasChild('authorID')) {
					return;
				}

				// Unique Timeline key.
				const timelineKey = { 'timelineID': childSnapshot.key };

				// Assign timeline to userTimelines.
				if ( childSnapshot.val().authorID.valueOf(uid) === uid ) {
					userTimelines.push(
						Object.assign( timelineKey, childSnapshot.val())
					);
				}
		});

		return userTimelines;
	});
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