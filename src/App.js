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

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const App = () => {
  const [posts, setPosts] = useState([])
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

  useEffect(() => {
    /**
     * If logged in, Trigger a refetch if `posts/` changes.
     */
    if (uid) {
      firebase
        .database()
        .ref('posts/')
        .on('child_changed', () => {
          setPosts([])
        })
    }

    return () => firebase.database().ref('posts/').off()
  }, [uid])

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
      if (Array.isArray(allPosts) && !hasPosts) {
        setPosts(allPosts)
      }
    }

    // Initalize login check.
    getPostsData()
  }, [uid, posts])

  // Interrupt post direction.
  const changePostDirection = direction => {
    setPosts(dataDirection(posts, direction))
  }

  const onLogout = () => {
    setUid(null)
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
            render={() =>
              uid ? <Timeline timelinePosts={posts} uid={uid} /> : <SignIn />
            }
          />
          <Route
            exact
            path="/add-new-post"
            render={() =>
              uid && <NewPost hasPosts={hasPosts} uid={uid} />
            }
          />
          <Route
            exact
            path="/create-account"
            render={() => <RegisterAccount />}
          />
          <Route
            exact
            path="/post-success"
            render={() => uid && <Success successHeader="New Post Created!" />}
          />
          {hasPosts && (
            <Route
              path="/posts/post:postKey"
              render={props => {
                const post = posts.find(
                  // eslint-disable-next-line react/prop-types
                  post => post.id === props.match.params.postKey,
                )
                return post ? <Single {...post} /> : <NotFound />
              }}
            />
          )}
          {hasPosts && (
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
