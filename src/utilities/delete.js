import firebase from '../firebase';

/**
 * Delete a post.
 *
 * @param string postKey unique post identifier.
 */
function deletePost( postKey ) {
	console.log( 'deletePost:', postKey );

	// Set value to null to remove.
	const postData = null;

	// Write the new post's data simultaneously in the posts list and the user's post list.
	const updates = {};

	// Create a new post under /posts.
	updates[`/posts/${ postKey }`] = postData;

	return firebase.database().ref().update(updates);
}

/**
 * Delete post from a specific timeline.
 *
 * @param string postKey unique post identifier.
 * @param string timelineKey unique timeline identifier.
 */
function deletePostFromTimeline( postKey, timelineKey ) {
	console.log( 'deletePostFromTimeline:', { postKey, timelineKey } );

	// Set value to null to remove.
	const timelineData = null;

	// Write the new post's data simultaneously in the posts list and the user's post list.
	const updates = {};

	// Insert new post data under timelines/timeline/posts/
	updates[`/timelines/${ timelineKey }/posts/${ postKey }/`] = timelineData;

	return firebase.database().ref().update(updates);
}

/**
 * Delete media based on url.
 *
 * @param string url to media file.
 */
function deleteMediaFromStorage( url ) {
	if ( url === '' ) {
		console.error( 'URL undefined or empty' );
		return;
	}

	const storage = firebase.storage();

	const imageObject = storage.ref().child(url);

	if ( imageObject ) {
		// Delete the file
		imageObject.delete().then(function() {
			console.log( 'IMAGE DELETED:', { url, imageObject } );
		}).catch(function(error) {
			console.error( error );
		});
	}
}

export { deletePost, deleteMediaFromStorage, deletePostFromTimeline };
