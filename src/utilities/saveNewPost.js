import firebase from '../firebase'
import {sanitizeHyphenatedSlug} from './sanitize-fields'
import assignPostToTimeline from './assignPostToTimeline'
import saveNewTimeline from './saveNewTimeline'

/**
 * Save new post.
 *
 * Newly created post must be associated with a new or existing timeline.
 *
 * @param {Object} newPostObj
 */
export default function saveNewPost({
  date,
  existingTimelineKey,
  isNewTimeline = true,
  mediaUrl,
  newTimelineName,
  title,
  uid,
}) {
  if (!uid | !date | !title) {
    return console.error('saveNewPost() failed.')
  }

  /**
   * Pushes a new key to DB.
   *
   * ex: `app/posts/-MZZ8dRiYr5rvwmnIcSe`
   */
  const newPostKey = firebase.database().ref().child('posts').push().key

  /**
   * Push new timeline key to DB.
   *
   * ex: `app/timelines/-MZZ8jC9Y9eXDQj0peYX`
   */
  const timelineKey = isNewTimeline
    ? firebase.database().ref().child('timelines').push().key
    : existingTimelineKey

  if (!isNewTimeline) {
    assignPostToTimeline(timelineKey, newPostKey)
  } else {
    saveNewTimeline(
      {
        label: newTimelineName || timelineKey,
        postKey: newPostKey,
        timelineKey: timelineKey,
        uid,
      },
      isNewTimeline,
    )
  }

  firebase
    .database()
    .ref()
    .update({
      [`/posts/${newPostKey}`]: {
        authorID: uid,
        date: new Date(date),
        dateCreated: new Date(),
        id: newPostKey,
        imageURL: mediaUrl,
        slug: sanitizeHyphenatedSlug(title),
        timelines: {
          [timelineKey]: timelineKey,
        },
        title: title,
      },
    })
}