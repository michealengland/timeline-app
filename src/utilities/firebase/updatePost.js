import firebase from '@FirebaseApp'
import generateFirebaseUpdateObject from '@Utilities/firebase/generateFirebaseUpdateObject'

/**
 * Update properties on `posts/postKey`.
 *
 * Note: Empty Objects, do not trigger updates in firebase.
 *
 * @param {string} postKey        Key of post to updated.
 * @param {string} uid            User id.
 * @param {Object} updatedPostObj Object of updated post values to send to Firebase.
 */
export default function updatePost(
  postKey = '',
  uid = '',
  updatedPostObj = {},
) {
  if (!postKey || !uid) {
    return
  }

  return firebase
    .database()
    .ref()
    .update(
      generateFirebaseUpdateObject(`/posts/${uid}/${postKey}`, updatedPostObj),
      error => {
        if (error) {
          // The write failed...
          console.error(error)
          return false
        } else {
          return true
        }
      },
    )
}
