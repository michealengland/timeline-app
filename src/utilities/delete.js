import firebase from '../firebase'

/**
 * Delete 'posts/postKey' from '/posts'.
 *
 * @param string postKey Post to remove.
 */
function deletePost(postKey) {
  if (typeof postKey !== 'string') {
    return;
  }

  // Remove post.
  firebase.database().ref(`/posts/${postKey}`).remove()
}

/**
 * Delete postKey from timelinesKeys.
 *
 * @param {string}    postKey Post to remove.
 * @param {Array} timelineKey Array of timeline keys.
 */
function deletePostFromTimeline(postKey, timelineKeys = []) {
  if (! Array.isArray(timelineKeys)) {
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
      [`/timelines/${timelineKeys[i]}/posts/${postKey}`]: null,
    })
  }
}

/**
 * Delete media based on url.
 *
 * @param string url to media file.
 */
function deleteMediaFromStorage(url) {
  if (url === '') {
    console.error('URL undefined or empty')
    return
  }

  const storage = firebase.storage()

  const imageObject = storage.ref().child(url)

  if (imageObject) {
    // Delete the file
    imageObject
      .delete()
      .then(function () {
        console.log('IMAGE DELETED:', {url, imageObject})
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}

export {deletePost, deleteMediaFromStorage, deletePostFromTimeline}
