import firebase from '../firebase'

/**
 * Creates a new entry on the timeline posts Object.
 *
 * Ex: `/timelines/-MZ_YBM7uRFA0jJxbiDp/posts/-MZ_eg9oMx_mi-uqPjnL/`
 *
 * @param {string} timelineKey Timeline id.
 * @param {string} postKey     Post id.
 * @param {string} uid         User id.
 */
export default function assignPostToTimeline(timelineKey, postKey, uid) {
  if (!timelineKey || !postKey || !uid) {
    return console.error('assignPostToTimeline() failed.')
  }

  firebase
    .database()
    .ref()
    .update({
      [`/timelines/${uid}/${timelineKey}/posts/${postKey}/`]: postKey,
    })
}
