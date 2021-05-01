import firebase from '../firebase'
import {sanitizeHyphenatedSlug} from './sanitize-fields'

/**
 * Save a new timline.
 *
 * Save new Timeline Object to `timeline-app/timelines/-MZ_bEQViXcbbpgkO6Z2
 *
 * Note: New Timelines are created with new posts.
 *
 * @param {Object} newTimelineObj
 */
export default function saveNewTimeline({label, postKey, timelineKey, uid}) {
  if (!uid || !label || !postKey || !timelineKey) {
    return console.error('saveNewTimeline() failed.')
  }

  firebase
    .database()
    .ref()
    .update({
      [`/timelines/${timelineKey}`]: {
        authorID: uid,
        dateCreated: new Date(),
        label: label,
        slug: sanitizeHyphenatedSlug(label),
        posts: {
          [postKey]: postKey,
        },
      },
    })
}
