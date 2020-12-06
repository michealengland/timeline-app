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
  const [userID, setUserId] = useState('');
  const [postsDirection, setPostsDirection] = useState('normal');

  // on userID change check user state.
  useEffect(() => {
    const loggedIn = firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        setUserId( firebase.auth().currentUser.uid );
      } else {
        setUserId( null );
      }
    });

    // wait for logged in data loggedIn Data.
    const getAuth = async () => {
      const userData = await loggedIn;

      return userData;
    }

    getAuth();
  }, []);

  // Get Posts Data on userID update.
  useEffect(() => {
    // Set posts on page load.
    const getPostsData = async () => {
      if ( firebase.auth().currentUser === null ) {
        return;
      }

      // Await for posts value.
      const allPosts = await fetchUserPosts(userID);

      // Verify we have posts and that we haven't already gotten posts.
      if ( allPosts.length > 0 && posts?.length === 0 ) {
        // Format post direction.
        dataDirection( allPosts, postsDirection );

        // set posts with chronological date order.
        setPosts( allPosts );
      }
    }

    // Initalize login check.
    getPostsData();
  }, [userID, posts, postsDirection]);

  // Interrupt post direction.
  const changePostDirection = ( direction ) => {
    setPostsDirection( direction );
    setPosts( dataDirection( posts, direction ) );
  }

  const onLogout = () => {
    setUserId('');
    setPosts([]);
  }

  const currentUser = firebase.auth().currentUser;

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
            render={ () => currentUser === null ? <SignIn onLogin={ onLogin } /> : <Redirect to='/all' /> }
          />
          <Route
            exact
            path="/add-new-post"
            render={ () => userID && posts && <NewPost postCount={ posts.length } uid={ userID } /> }
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
