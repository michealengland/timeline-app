import React, { useState, useEffect } from 'react';
import All from './views/All';
import Layout from './layout/Layout';
import dataDirection from './utilities/filterDates';
import NewPost from './views/NewPost';
import NotFound from './views/NotFound';
import RegisterAccount from './views/RegisterAccount';
import Single from './views/Single';
import SignIn from './views/SignIn';
import Success from './layout/Success';
import Timeline from './views/Timeline';
import { fetchUserPosts } from './utilities/query';
import onLogin from './utilities/login'

import firebase from './firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userID, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [postsDirection, setPostsDirection] = useState('normal');

  /**
   * Initiate Auth check.
   */
  useEffect(() => {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user?.uid) {
        setUserId(user.uid);
        setIsLoggedin(true)
      }
    });
  }, []);

  /**
   * Get set posts once user is logged in.
   */
  useEffect(() => {
    const getUserPosts = async () => {
      const userPosts = await fetchUserPosts(userID);

      // Return early if no posts are found.
      if (! Array.isArray(userPosts) || userPosts.length === 0) {
        return;
      }

      // Adjust userPosts Array order.
      dataDirection(userPosts, postsDirection);
      // Set posts.
      setPosts(userPosts);
    }

    // Invoke function if have a UID.
    userID && getUserPosts();
  }, [userID, postsDirection])

  // Interrupt post direction.
  const changePostDirection = ( direction ) => {
    setPostsDirection( direction );
    setPosts( dataDirection( posts, direction ) );
  }

  // Reset state on user logout.
  const onLogout = () => {
    setIsLoggedin(false)
    setUserId(null);
    setPosts([]);
  }

  return (
    <Router>
      <Layout
        changePostDirection={ changePostDirection }
        onLogout={ onLogout }
        posts={ posts }
        uid={ userID }
      >
        <Switch>
          <Route
            exact
            path="/"
            render={ () => isLoggedIn ? <SignIn onLogin={ onLogin } /> : <Redirect to='/all' /> }
          />
          <Route
            exact
            path="/add-new-post"
            render={ () => isLoggedIn && userID && posts && <NewPost postCount={ posts.length } uid={ userID } /> }
          />
          <Route
            exact
            path="/all"
            render={ () => ( <All timelinePosts={ posts } uid={ userID } /> ) }
          />
          <Route
            exact
            path="/create-account"
            render={ () => <RegisterAccount /> }
          />
          <Route
            exact
            path="/post-success"
            render={ () => userID !== null && <Success successHeader="New Post Created!" /> }
          />
         {
          posts.length > 0 &&
            <Route
              path="/posts/post:postId"
              render={ props => {
                const post = posts.find( post => post.id === props.match.params.postId );
                return post ? <Single { ...post } /> : <NotFound />;
              } }
            />
         }
         {
          posts.length > 0 &&
            <Route
              path="/timelines/timeline:postTimeline"
              render={ props => {
                const post = posts.find( post => post.timeline === props.match.params.postTimeline );

                return ( post ? <Timeline timelinePosts={ posts } timeline={ post.timeline } uid={ userID } /> : <NotFound /> );
              } }
            />
          }
          <Route component={ NotFound } />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
