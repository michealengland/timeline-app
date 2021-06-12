import firebase from '../firebase'

/**
 * Process data Object into path based Object for Firebase.
 *
 * @param {string} path    Path of value to update in Firebase.
 * @param {Object} dataObj Data Object to create Firebase update Object from.
 * @return {Object}
 */
function generateFirebaseUpdateObject(path, dataObj) {
  const valuesToUpdate = {}
  const dataKeys = Object.keys(dataObj)

  for (let i = 0; i < dataKeys.length; i++) {
    valuesToUpdate[`${path}/${dataKeys[i]}`] = dataObj[dataKeys[i]]
  }

  return valuesToUpdate
}

/**
 * Update properties on `posts/postKey`.
 *
 * Note: Empty Objects, do not trigger updates in firebase.
 *
 * @param {string} postKey        Key of post to updated.
 * @param {Object} updatedPostObj Object of updated post values to send to Firebase.
 */
function updatePost(postKey, updatedPostObj = {}) {
  if (!postKey) {
    return
  }

  firebase
    .database()
    .ref()
    .update(generateFirebaseUpdateObject(`/posts/${postKey}`, updatedPostObj))
}

export {updatePost}
