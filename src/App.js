import React, {useState, useEffect} from 'react'
import Timeline from './components/organisms/Timeline'
import Layout from './components/organisms/Layout'
import dataDirection from './utilities/filterDates'
import NewPost from './components/organisms/NewPost'
import NotFound from './components/organisms/NotFound'
import RegisterAccount from './components/organisms/RegisterAccount'
import Single from './components/organisms/Single'
import SignIn from './components/organisms/SignIn'
import Success from './components/organisms/Success'
import {getAllUserPosts} from './utilities/query'

import firebase from './firebase'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

const App = () => {
  const [posts, setPosts] = useState([])
  const [uid, setUid] = useState(null)
  const [postsDirection, setPostsDirection] = useState('normal')

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

      // Verify we have posts and that we haven't already gotten posts.
      if (allPosts.length > 0 && posts && posts.length === 0) {
        // Format post direction.
        dataDirection(allPosts, postsDirection)

        // set posts with chronological date order.
        setPosts(allPosts)
      }
    }

    // Initalize login check.
    getPostsData()
  }, [uid, posts, postsDirection])

  // Interrupt post direction.
  const changePostDirection = direction => {
    setPostsDirection(direction)
    setPosts(dataDirection(posts, direction))
  }

  const onLogout = () => {
    setUid('')
    setPosts([])
  }

  return (
    <Router>
      <Layout
        changePostDirection={changePostDirection}
        onLogout={onLogout}
        posts={posts}
        uid={uid}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={() => (!uid ? <SignIn /> : <Redirect to="/all" />)}
          />
          <Route
            exact
            path="/add-new-post"
            render={() =>
              uid && posts && <NewPost postCount={posts.length} uid={uid} />
            }
          />
          <Route
            exact
            path="/all"
            render={() => <Timeline timelinePosts={posts} uid={uid} />}
          />
          <Route
            exact
            path="/create-account"
            render={() => <RegisterAccount />}
          />
          <Route
            exact
            path="/post-success"
            render={() =>
              uid !== null && <Success successHeader="New Post Created!" />
            }
          />
          {posts.length > 0 && (
            <Route
              path="/posts/post:postId"
              render={props => {
                const post = posts.find(
                  // eslint-disable-next-line react/prop-types
                  post => post.id === props.match.params.postId,
                )
                return post ? <Single {...post} /> : <NotFound />
              }}
            />
          )}
          {posts.length > 0 && (
            <Route
              path="/timelines/timeline:timelineKey"
              render={props => {
                // Filter posts to Timeline posts that include timeline key.
                const matchedPosts = posts.filter(post => {
                  // eslint-disable-next-line react/prop-types
                  return props.match.params.timelineKey in post.timelines
                })

                return matchedPosts ? (
                  <Timeline timelinePosts={matchedPosts} uid={uid} />
                ) : (
                  <NotFound />
                )
              }}
            />
          )}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
