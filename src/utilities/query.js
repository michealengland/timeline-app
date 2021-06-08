import firebase from '../firebase'

// TODO getUserTimelines does not appear to user specific.
/**
 * Get all timelines from user.
 *
 * @param {string} uid User id.
 * @return             Promise Array of user timelines.
 */
function getUserTimelines(uid = '') {
  if (!uid) {
    return []
  }

  const query = firebase.database().ref('timelines/')
  const timelinesQuery = query.once('value').then(snapshot => {
    let userTimelines = []

    snapshot.forEach(childSnapshot => {
      const timelineKey = {timelineID: childSnapshot.key}
      const timelineData = Object.assign(timelineKey, childSnapshot.val())

      // Get timeline object.
      userTimelines.push(timelineData)
    })

    return userTimelines
  })

  return timelinesQuery
}

// @TODO user posts fetch is not user specific. See #53

/**
 * Get all posts in database.
 *
 * @return {Array} Array of posts.
 */
async function getAllPosts() {
  const posts = [];
  const query = firebase.database().ref('posts/').orderByChild('date')

  // Resolve promise returned from query.
  await query.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      posts.push(childSnapshot.val())
    });
  });

  return posts;
}

async function getAllUserPosts(uid) {
  let userPosts = []

  // Get posts.
  const posts = await getAllPosts()

  if (posts) {
    // Filter posts based on user ID.
    userPosts = posts.filter(post => post.authorID === uid)
  }

  return userPosts || posts
}

export {getUserTimelines, getAllUserPosts}
