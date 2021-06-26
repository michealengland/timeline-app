import firebase from '../../firebase'

/**
 * Delete 'posts/postKey' from '/posts'.
 *
 * @param {string} postKey Post to remove.
 * @param {string} uid     User id.
 */
function deletePost(postKey, uid) {
  if (typeof postKey !== 'string' | typeof uid !== 'string') {
    console.error('deletePost() failed.');
    return;
  }

  // Remove post.
  firebase.database().ref(`/posts/${uid}/${postKey}`).remove()
}

/**
 * Delete postKey from timelinesKeys.
 *
 * @param {string}    postKey Post to remove.
 * @param {string}    uid     User id.
 * @param {Array} timelineKey Object of timelineKeys data.
 */
function deletePostFromTimeline(postKey, uid , timelineKeys) {
  if (!postKey || !uid) {
    console.error('deletePostFromTimeline() failed.');
    return;
  }

  // const valuesToUpdate = {}
  const dataKeys = Object.keys(timelineKeys)

  for (let i = 0; i < dataKeys.length; i++) {
    firebase.database().ref(`/timelines/${uid}/${dataKeys[i]}/posts/${postKey}`).remove()
  }
}

/**
 * Delete media based on url.
 *
 * @param {string} url Url of media to remove.
 * @param {string} uid User id.
 */
function deleteMediaByUrlFromStorage(url, uid) {
  if (!url || !uid) {
    console.error('deleteMediaFromStorage() failed')
    return
  }

  firebase.storage().refFromURL(url).delete();
}

export {deletePost, deleteMediaByUrlFromStorage, deletePostFromTimeline}
