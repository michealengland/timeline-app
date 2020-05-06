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

const getAllPosts = () => {
	const userTimelines = [];

	const query = firebase.database().ref("timelines").orderByKey();

	query.once("value")
		.then( (snapshot) => {
			snapshot.forEach( ( childSnapshot ) => {
			// let key = childSnapshot.key;

			// Get timeline object.
			userTimelines.push( childSnapshot.val() );
		});
	});

	return userTimelines;
};

export { getUserTimelines, getAllPosts };