import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import All from './views/All';
import Timeline from './views/Timeline';
import Welcome from './views/Welcome';
import NotFound from './views/NotFound';
import TimelinePost from './components/TimelinePost';
import Login from './components/Login';
import RegisterAccount from './layout/RegisterAccount';
import AddNewPost from './layout/AddNewPost';

import { getAllPosts, getLoginStatus } from './utilities/query';

import firebase from './firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [userID, setUserId] = useState('');

  // Check login and assing uid on page load.
  useEffect(() => {
    async function init() {
      // wait on function to resolve to true.
      const uid = await getLoginStatus();

      // Set State to true.
      if ( uid && userID === '' ) {
        console.log( 'UID SET' );
        setUserId( uid );
      }
    }

    init();
  });

  // Get Posts Data on userID update.
  useEffect(() => {
    // Set posts on page load.
    async function getPostsData( userID ) {
      if ( userID ) {
        return;
      }

      // wait on function to resolve to true.
      const allPosts = await getAllPosts();

      // Verify we have posts and that we haven't already gotten posts.
      if ( allPosts.length > 0 && posts.length === 0 ) {
        console.log( 'POSTS FETCHED!', 'POST COUNT:', allPosts.length );
        setPosts( allPosts );
      }
    }

    // Initalize login check.
    getPostsData( userID );
  }, [posts, userID]);

  const onLogin = ( email, password ) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then( user => console.log( 'Logged in', user ) )
      .catch( error => console.error( error ) );
  };

  // Display All or Welcome.
  const view = userID && posts ? <All timelinePosts={ posts } /> : <h1>LOADING</h1> ;

  const currentView = ! userID ? <Welcome onLogin={ onLogin } /> : view;

  if ( userID && posts ) {
    const testFindPost = posts.find( ( { authorID } ) => authorID === 'ra98qt6t2LfK8afDAjbNYQW6vZ02' );

    console.log( 'TEST FIND AUTHOR ID:', testFindPost );
  }

  return (
    <Router>
      <Layout uid={ userID }>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => currentView }
          />
          <Route
            exact
            path="/login"
            render={ () => <Login onLogin={ onLogin } /> }
          />
          <Route
            exact
            path="/create-account"
            render={ () => <RegisterAccount /> }
          />
          <Route
            exact
            path="/add-new-post"
            render={ () => <AddNewPost /> }
          />
         {
          posts.length > 0 &&
            <Route
            path="/posts/:postSlug"
            render={ props => {
              const post = posts.find( post => post.slug === props.match.params.postSlug );

              const { date, imageURL, slug, timeline, title } = post;

              return (
                post ?
                <TimelinePost
                  date={ date }
                  imageURL={ imageURL }
                  slug={ slug }
                  timeline={ timeline }
                  title={ title }
                /> :
                <NotFound />
              );
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
