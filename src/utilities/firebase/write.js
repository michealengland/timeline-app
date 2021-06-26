/**
 * Functions in charge of writing to the DB.
 *
 * All functions and props are listed alphabetically.
 */

import firebase from '@FirebaseApp'

const createAccount = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message

      console.log('errorCode', errorCode)
      console.log('errorMessage', errorMessage)
    })
}

/**
 * Get an upload media url from Firebase Storage.
 *
 * @param {Object} file media upload object.
 * @param {string}  uid User ID.
 * @return {string} uploaded media url.
 */
async function uploadMediaToStorage(file, uid) {
  if (!file || !uid) {
    console.error(`Media upload failed, check file: ${file} and ${uid} `)

    return null
  }

  // Access firebase Storage Object.
  const storageRef = firebase.storage().ref()

  // Write media to storage.
  const fileRef = await storageRef
    // Create a unique string and assign under media.
    // ex image name: 1595899021513-christine-sandu-FG4SQONz89Q-unsplash.jpg
    .child(`media/${uid}/${Date.now()}-${file.name}`)
    // Write the
    .put(file, {
      contentType: 'image/jpeg',
    })

  // Return the url of newly stored media itemPropTypes.any,
  const mediaUrl = await fileRef.ref.getDownloadURL().then(url => url)

  return mediaUrl
}

export {
  createAccount,
  uploadMediaToStorage,
}
