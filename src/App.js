import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import All from './views/All';
import Timeline from './views/Timeline';
import Welcome from './views/Welcome';
import NotFound from './views/NotFound';
import TimelinePost from './components/TimelinePost';
import Login from './components/Login';
import RegisterAccount from './layout/RegisterAccount';

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
  const [userID, setUserId] = useState();

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
    }, [timelines]);

    // Set User State
    useEffect( () => {
      firebase.auth().onAuthStateChanged(function(user) {
        if ( user ) {
          setIsLoggedIn( true );
          setUserId( user.uid );
        } else {
          setIsLoggedIn( false );
        }
      });
    }, [isLoggedIn, userID]);

  // Set posts on page load.
  useEffect( () => {
    if ( isLoggedIn === true && postsDemo.length > 1 ) {
      setPosts( postsDemo );
    }
  }, [isLoggedIn]);

  // Display All or Welcome.
  const currentView = typeof Object && posts.length > 0 ? <All timelinePosts={ posts } /> : <Welcome />;

  const onLogin = ( email, password ) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then( user => console.log( 'Logged in', user ) )
      .catch( error => console.error( error ) );
  };

  return (
    <Router>
      <Layout { ...userID }>
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

              return (
              post ?
                <TimelinePost
                  date={ post.date }
                  imageAlt={ post.image.imageAlt }
                  imageURL={ post.image.imageURL }
                  key={ post.key }
                  postId={ post.id }
                  slug={ post.slug }
                  timeline={ post.category }
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
