import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import All from './views/All';
import Timeline from './views/Timeline';
import Welcome from './views/Welcome';
import NotFound from './views/NotFound';
import TimelinePost from './components/TimelinePost';
import Login from './components/Login';
import CreateAccount from './layout/CreateAccount';

import firebase from './firebase';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

const postsDemo = [
  {
    id: 1,
    slug: 'post1',
    category: 'Sundays',
    date: '03-07-2019',
    title: 'Maecenas egestas',
    image: {
      imageURL: "https://cdn2.thecatapi.com/images/bL3lrUi1A.jpg",
      imageAlt: "Image Alt Value",
    }
  },
 {
    id: 2,
    slug: 'post2',
    category: 'Bathroom Selfie',
    date: '04-04-2020',
    title: 'Proin faucibus arcu quis',
    image: {
      imageURL: "https://cdn2.thecatapi.com/images/IFXsxmXLm.jpg",
      imageAlt: "Image Alt Value",
    }
  },
  {
    id: 3,
    slug: 'post3',
    category: 'Chillin',
    date: '04-27-2020',
    title: 'Curabitur',
    image: {
      imageURL: "https://cdn2.thecatapi.com/images/IOqJ6RK7L.jpg",
      imageAlt: "Image Alt Value",
    }
  },
  {
    id: 4,
    slug: 'post4',
    category: 'Chillin',
    date: '04-28-2020',
    title: 'Nam commodo suscipit quam',
    image: {
      imageURL: "https://cdn2.thecatapi.com/images/pB_IDnwMf.jpg",
      imageAlt: "Image Alt Value",
    }
  }
];

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState( false );
  const [userId, setUserId] = useState( '' );

  const timelines = [];

    // Set posts on page load.
    useEffect( () => {
      const query = firebase.database().ref("timelines").orderByKey();

      query.once("value")
        .then( (snapshot) => {
          snapshot.forEach( ( childSnapshot ) => {
            // let key = childSnapshot.key;

            // Get timeline object.
            timelines.push( childSnapshot.val() );
        });
      });
    }, []);

    // Set posts on page load.
    useEffect( () => {
      firebase.auth().onAuthStateChanged(function(user) {
        if ( user ) {
          console.log( user );
          // User is signed in.
          setIsLoggedIn( true );
          setUserId( 'meow' );
        } else {
          // No user is signed in.
          setIsLoggedIn( false );
        }
      });
    }, [isLoggedIn, userId]);


    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                      // this value to authenticate with your backend server, if
                      // you have one. Use User.getToken() instead.
    }

    console.log( uid );

  // Set posts on page load.
  useEffect( () => {
    // console.log( 'query', query );

    // console.log( timelines );
    if ( postsDemo.length > 1 ) {
      setPosts( postsDemo );
    }
  }, []);

  // Display All or Welcome.
  const currentView = typeof Object && posts.length > 0 ? <All timelinePosts={ posts }/> : <Welcome isLoggedIn />;

  const onLogin = ( email, password ) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then( user => console.log( 'Logged in', user ) )
      .catch( error => console.error( error ) );
  };

  return (
    <Router>
      <Layout>
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
            render={ () => <CreateAccount /> }
          />
          <Route
            path="/post/:postSlug"
            render={ props => {
              const post = posts.find( post => post.slug === props.match.params.postSlug );

              return (
              post ?
                <TimelinePost
                  slug={ post.slug }
                  timeline={ post.category }
                  date={ post.date }
                  imageAlt={ post.image.imageAlt }
                  imageURL={ post.image.imageURL }
                  key={ post.key }
                  postId={ post.id }
                  title={ post.title }
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
              post ? <Timeline timelinePosts={ posts } currentCategory={ post.category } />: <NotFound />
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
