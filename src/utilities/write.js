/**
 * Functions in charge of writing to the DB.
 *
 * All functions and props are listed alphabetically.
 */

import firebase from '../firebase'
import {sanitizeHyphenatedSlug} from './sanitize-fields'

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

function writePostToNewTimeline(uid, date, imageURL, title, label) {
  if (uid === '') {
    return console.error('NO UID PROVIDED')
  }

  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key
  const newTimelineKey = firebase.database().ref().child('posts').push().key

  // A post entry.
  const postData = {
    authorID: uid,
    date: new Date(date),
    dateCreated: new Date(),
    imageURL: imageURL,
    id: newPostKey,
    slug: sanitizeHyphenatedSlug(title),
    timeline: newTimelineKey,
    title: title,
  }

  // New Timeline Entry
  const timelineData = {
    authorID: uid,
    dateCreated: new Date(),
    label: label,
    slug: sanitizeHyphenatedSlug(label),
    posts: {
      [newPostKey]: {
        id: newPostKey,
      },
    },
  }

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {}

  // Create a new post under /posts.
  updates[`/posts/${newPostKey}`] = postData

  // Create a new timeline under /timelines/ + key
  updates[`/timelines/${newTimelineKey}`] = timelineData

  return firebase.database().ref().update(updates)
}

function writePostToExistingTimeline(uid, date, imageURL, title, timelineKey) {
  if (uid === '' || timelineKey === '' || title === '') {
    return console.error('NO UID PROVIDED')
  }

  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key

  // A post entry.
  var postData = {
    authorID: uid,
    date: new Date(date),
    dateCreated: new Date(),
    imageURL: imageURL,
    id: newPostKey,
    slug: sanitizeHyphenatedSlug(title),
    timeline: timelineKey,
    title: title,
  }

  // New Timeline Entry
  const timelineData = {
    id: newPostKey,
  }

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {}

  // Create a new post under /posts.
  updates[`/posts/${newPostKey}`] = postData

  // Insert new post data under timelines/timeline/posts/
  updates[`/timelines/${timelineKey}/posts/${newPostKey}/`] = timelineData

  return firebase.database().ref().update(updates)
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
  writePostToNewTimeline,
  writePostToExistingTimeline,
  uploadMediaToStorage,
}
