import firebase from '../firebase'

/**
 * Creates a new entry on the timeline posts Object.
 *
 * Ex: `/timelines/-MZ_YBM7uRFA0jJxbiDp/posts/-MZ_eg9oMx_mi-uqPjnL/`
 *
 * @param {string} timelineKey
 * @param {string} postKey
 */
export default function assignPostToTimeline(timelineKey, postKey) {
  if (!timelineKey || !postKey) {
    return console.error('assignPostToTimeline() failed.')
  }

  firebase
    .database()
    .ref()
    .update({
      [`/timelines/${timelineKey}/posts/${postKey}/`]: postKey,
    })
}
