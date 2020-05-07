import firebase from '../firebase';

const getUserTimelines = () => {
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

	console.log( 'new timelines', timelines );

	return timelines;
};


// firebase.auth().onAuthStateChanged( user => {
// 	if ( user ) {
// 		setIsLoggedIn( true );
// 		setUserId( user.uid );
// 	} else {
// 		setIsLoggedIn( false );
// 	}
// });


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

export { getUserTimelines, getAllPosts, getLoginStatus };