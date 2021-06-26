import React, {useState, useEffect} from 'react'
import Timeline from '@Organisms/Timeline'
import Layout from '@Organisms/Layout'
import dataDirection from '@Utilities/filterDates'
import NewPost from '@Organisms/NewPost'
import NotFound from '@Organisms/NotFound'
import RegisterAccount from '@Organisms/RegisterAccount'
import Single from '@Organisms/Single'
import SignIn from '@Organisms/SignIn'
import Success from '@Organisms/Success'
import {getAllUserPosts} from '@Utilities/firebase/query'

import firebase from './firebase'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const App = () => {
  const [posts, setPosts] = useState(undefined)
  const [uid, setUid] = useState()
  const hasPosts = Array.isArray(posts) && posts.length > 0

  // on uid change check user state.
  useEffect(() => {
    const isLoggedIn = () =>
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setUid(firebase.auth().currentUser.uid)
        } else {
          setUid(null)
        }
      })

    isLoggedIn()
  }, [])

  // Get Posts Data on uid update.
  useEffect(() => {
    // Set posts on page load.
    const getPostsData = async () => {
      if (!uid) {
        return
      }

      // wait on function to resolve to true.
      const allPosts = await getAllUserPosts(uid)
      const postsData = Array.isArray(allPosts) && allPosts.length > 0 ? allPosts : null;

      // Verify we have posts and that we haven't already gotten posts.
      if (posts === undefined) {
        setPosts(postsData)
      }
    }

    const refreshPosts = async () => {
      // wait on function to resolve to true.
      const allPosts = await getAllUserPosts(uid)
      // If we have posts, set them.
      if (Array.isArray(allPosts)) {
        setPosts(allPosts)
      }
    }

    if (uid) {
      firebase
        .database()
        .ref(`posts/${uid}`)
        .on('child_changed', (posts) => {
          if (! posts.hasChildren()) {
            return;
          }

          refreshPosts()
        })

        firebase
        .database()
        .ref(`posts/${uid}`)
        .on('child_removed', () => {
          refreshPosts()
        })
    }

    // Initalize login check.
    getPostsData()

    // Remove all event listeners on posts.
    return () => firebase.database().ref(`posts/${uid}`).off()
  }, [uid, posts])

  // Interrupt post direction.
  const changePostDirection = direction => {
    if (!hasPosts) {
      return;
    }

    setPosts(dataDirection(posts, direction));
  }

  const onLogout = () => {
    setUid(null)
    setPosts(undefined)
  }

  return (
    <Router>
      <Layout
        changePostDirection={changePostDirection}
        hasPosts={hasPosts}
        onLogout={onLogout}
        posts={posts}
        uid={uid}
      >
        <Switch>
          {! uid && <SignIn />}
          <Route exact path="/">
            { hasPosts &&
              <Timeline hasPosts={hasPosts} timelinePosts={posts} uid={uid} />
            }
            {posts === null &&
              <NewPost hasPosts={hasPosts} uid={uid} />
            }
          </Route>
          <Route exact path="/add-new-post">
            <NewPost hasPosts={hasPosts} uid={uid} />
          </Route>
          <Route exact path="/create-account">
            <RegisterAccount />
          </Route>
          <Route exact path="/post-success">
            <Success successHeader="New Post Created!" />
          </Route>
          <Route
            path="/posts/post:postKey"
            render={props => {
              if (! hasPosts) {
                return null;
              }

              const post = posts.find(
                // eslint-disable-next-line react/prop-types
                post => post.id === props.match.params.postKey,
              )
              return post ? <Single {...post} uid={uid} /> : <NotFound />
            }}
          />
          <Route
            path="/timelines/timeline:timelineKey"
            render={props => {
              if (! hasPosts) {
                return null;
              }

              const matchedPosts = posts.filter(post => {
                // eslint-disable-next-line react/prop-types
                return props.match.params.timelineKey in post.timelines
              })

              return matchedPosts ? (
                <Timeline hasPosts={hasPosts} timelinePosts={matchedPosts} uid={uid} />
              ) : (
                <NotFound />
              )
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
