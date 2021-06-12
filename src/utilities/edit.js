import firebase from '../firebase'

/**
 * Update properties on `posts/postKey`.
 *
 * @param {string} postKey        Key of post to updated.
 * @param {Object} updatedPostObj Object of updated post values to send to Firebase.
 */
function updatePost(postKey, updatedPostObj) {
  if (!postKey) {
    return
  }

  const valuesToUpdate = {}
  const keys = Object.keys(updatedPostObj)

  for (let i = 0; i < keys.length; i++) {
    valuesToUpdate[`/posts/${postKey}/${keys[i]}`] = updatedPostObj[keys[i]]
  }

  firebase.database().ref().update(valuesToUpdate)
}

export {updatePost}
