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

function isLoggedIn() {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // resolve( true );
        resolve(user.uid)
      } else {
        resolve(false)
      }
    })
  })
}

async function getLoginStatus() {
  const result = await isLoggedIn()

  return result
}

function loopThroughPosts() {
  const posts = []
  const query = firebase.database().ref('posts/')

  return new Promise(resolve => {
    query.once('value').then(snapshot => {
      snapshot.forEach(function (childSnapshot) {
        posts.push(childSnapshot.val())
      })

      return resolve(posts)
    })
  })
}

async function getAllPosts() {
  const userTimelines = await loopThroughPosts()

  return userTimelines
}

async function getAllUserPosts(uid) {
  let userPosts = []

  // Get posts.
  const posts = await loopThroughPosts()

  if (posts) {
    // Filter posts based on user ID.
    userPosts = posts.filter(post => post.authorID === uid)
  }

  return userPosts || posts
}

export {getUserTimelines, getAllPosts, getAllUserPosts, getLoginStatus}
