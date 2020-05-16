import React, { useState, useEffect } from 'react';
import All from './views/All';
import Layout from './layout/Layout';
import NewPost from './views/NewPost';
import NotFound from './views/NotFound';
import RegisterAccount from './views/RegisterAccount';
import Single from './views/Single';
import SignIn from './views/SignIn';
import Success from './layout/Success';
import Timeline from './views/Timeline';
import { getAllPosts } from './utilities/query';

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

      // wait on function to resolve to true.
      const allPosts = await getAllPosts();

      // Verify we have posts and that we haven't already gotten posts.
      if ( allPosts.length > 0 && posts && posts.length === 0 ) {
        console.log( 'POSTS FETCHED!', 'POST COUNT:', allPosts.length );
        setPosts( allPosts );
      }
    }

    // Initalize login check.
    getPostsData();
  }, [userID, posts]);

  // Log in user.
  const onLogin = ( email, password ) => {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then( () => {
      // User must sign themselves out.
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch( (error) => {
      // Handle Errors here.
      console.log( error );
    });
  };

  const onLogout = () => {
    setUserId('');
    setPosts([]);
  }

  const currentUser = firebase.auth().currentUser;

  return (
    <Router>
      <Layout uid={ userID } onLogout={ onLogout }>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => currentUser === null ? <SignIn onLogin={ onLogin } /> : <Redirect to='/all' /> }
          />
          <Route
            exact
            path="/add-new-post"
            render={ () => userID && posts.length >= 0 && <NewPost postCount={ posts.length } uid={ userID } /> }
          />
          <Route
            exact
            path="/all"
            render={ (props) => ( <All timelinePosts={ posts } uid={ userID } /> ) }
          />
          <Route
            exact
            path="/create-account"
            render={ () => <RegisterAccount /> }
          />
          <Route
            exact
            path="/post-success"
            render={ () => userID !== null && <Success successHeader="New Created!" /> }
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

                return ( post ? <Timeline timelinePosts={ posts } timeline={ post.timeline } /> : <NotFound /> );
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
