import firebase from '../firebase'
import generateFirebaseUpdateObject from './generateFirebaseUpdateObject'

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
