import firebase from '../firebase'
import {sanitizeHyphenatedSlug} from './sanitize-fields'

export default function editPost(uid, date, imageURL, title, timelineKey) {
  console.log('editPost:')

  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key

  // A post entry.
  var postData = {
    authorID: uid,
    date: date,
    dateCreated: date,
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
