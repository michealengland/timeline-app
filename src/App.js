import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import All from './views/All';
import Timeline from './views/Timeline';
import Welcome from './views/Welcome';
import NotFound from './views/NotFound';
import TimelinePost from './components/TimelinePost';
import RegisterAccount from './views/RegisterAccount';
import AddNewPost from './layout/AddNewPost';
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

  // Log in user.
  const onLogin = ( email, password ) => (
     new Promise( ( resolve, reject ) => {
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then( user => resolve( user ) )
      .catch( error => reject( error ) );
    } )
  );

  const onLogout = ( newValue ) => {
    setUserId(newValue);
  }

  // Login and get UID value if login successful.
  const login = async ( email, password ) => {
    // Await for login data.
    const loginData = await onLogin( email, password );

    // Set userID.
    if ( loginData.user.uid !== '' ) {
      setUserId( loginData.user.uid );
    }
  }

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

  // Display All or Welcome.
  const view = userID && posts ? <All timelinePosts={ posts } /> : <h1>LOADING</h1> ;
  const currentView = userID === '' ? <Welcome onLogin={ login } /> : view;

  return (
    <Router>
      <Layout uid={ userID } onLogout={ onLogout }>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => currentView }
          />
          <Route
            exact
            path="/create-account"
            render={ () => <RegisterAccount /> }
          />
          <Route
            exact
            path="/add-new-post"
            render={ () => userID ? <AddNewPost uid={ userID } /> : <Redirect to="/" /> }
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
