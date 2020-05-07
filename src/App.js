import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import All from './views/All';
import Timeline from './views/Timeline';
import Welcome from './views/Welcome';
import NotFound from './views/NotFound';
import TimelinePost from './components/TimelinePost';
import Login from './components/Login';
import RegisterAccount from './layout/RegisterAccount';

import { getAllPosts, getLoginStatus } from './utilities/query';

import firebase from './firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

const App = () => {
  const [posts, setPosts] = useState();
  const [userID, setUserId] = useState();

  // Set uid on page load.
  async function init() {
    // wait on function to resolve to true.
    const uid = await getLoginStatus();

    // Set State to true.
    if ( uid ) {
      setUserId( uid );
    }
  }

  // Set posts on page load.
  async function getPostsData( userID ) {
    if ( userID ) {
      return;
    }

    // wait on function to resolve to true.
    const allPosts = await getAllPosts();

    if ( allPosts.length > 1 && ! posts ) {
      setPosts( allPosts );
    }
  }

  // Check login and assing uid on page load.
  useEffect(() => {
    init();
  });

  // Get Posts Data on userID update.
  useEffect(() => {
    getPostsData( userID );
  }, [userID]);

  // Display All or Welcome.
  const currentView = posts ? <All timelinePosts={ posts } /> : <Welcome />;

  const onLogin = ( email, password ) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then( user => console.log( 'Logged in', user ) )
      .catch( error => console.error( error ) );
  };

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
            path="/post/:postSlug"
            render={ props => {
              const post = posts.find( post => post.slug === props.match.params.postSlug );
              const { date, dateCreated, imageURL, slug, title, uid, } = post;

              return (
              post ?
                <TimelinePost
                  date={ date }
                  imageURL={ imageURL }
                  slug={ slug }
                  timeline="timeline-name"
                  title={ title }
                />
              : <NotFound />
              );
            } }
          />
          <Route
            path="/timeline/:postCategory"
            render={ props => {
              const post = posts.find( post => post.category === props.match.params.postCategory );

              console.log( props );

              return (
              post ? <Timeline timelinePosts={ posts } currentCategory={ 'post.category' } />: <NotFound />
              );
            } }
          />
          <Route component={ NotFound } />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
