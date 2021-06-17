import firebase from '../firebase'

/**
 * Delete 'posts/postKey' from '/posts'.
 *
 * @param {string} postKey Post to remove.
 * @param {string} uid     User id.
 */
function deletePost(postKey, uid) {
  if (typeof postKey !== 'string' | typeof uid !== 'string') {
    return;
  }

  // Remove post.
  firebase.database().ref(`/posts/${postKey}`).remove()
}

/**
 * Delete postKey from timelinesKeys.
 *
 * @param {string}    postKey Post to remove.
 * @param {string}    uid     User id.
 * @param {Array} timelineKey Array of timeline keys.
 */
function deletePostFromTimeline(postKey, uid , timelineKeys = []) {
  if (!uid | ! Array.isArray(timelineKeys)) {
    return;
  }

  /**
   * Remove postKey from posts in each timeline.
   */
  for (let i = 0; i < timelineKeys.length; i++) {
    firebase
    .database()
    .ref()
    .update({
      [`/timelines/${uid}/${timelineKeys[i]}/posts/${postKey}`]: null,
    })
  }
}

/**
 * Delete media based on url.
 *
 * @param {string} url Url of media to remove.
 * @param {string} uid User id.
 */
function deleteMediaFromStorage(url, uid) {
  if (!url || !uid) {
    console.error('deleteMediaFromStorage() failed')
    return
  }

  const imageObject = firebase.storage().ref().child(url)

  // Delete the file
  imageObject
    .delete()
    .then(function () {
      console.log(`Image ${url} removed`);
    })
    .catch(function (error) {
      console.error(error)
    })
}

export {deletePost, deleteMediaFromStorage, deletePostFromTimeline}
