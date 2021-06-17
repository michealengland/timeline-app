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
  media = {},
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
  const newPostKey = firebase.database().ref().child(`posts/${uid}`).push().key

  /**
   * Push new timeline key to DB.
   *
   * ex: `app/timelines/-MZZ8jC9Y9eXDQj0peYX`
   */
  const timelineKey = isNewTimeline
    ? firebase.database().ref().child(`timelines/${uid}`).push().key
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
      [`/posts/${uid}/${newPostKey}`]: {
        authorId: uid,
        date: date,
        dateCreated: new Date(),
        id: newPostKey,
        media,
        slug: sanitizeHyphenatedSlug(title),
        timelines: {
          [timelineKey]: timelineKey,
        },
        title: title,
      },
    })
}
