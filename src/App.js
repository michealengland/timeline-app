import React, { useState, useEffect } from 'react';
import Layout from './layout/Layout';
import All from './views/All';
import Timeline from './views/Timeline';
import Welcome from './views/Welcome';
import NotFound from './views/NotFound';
import TimelinePost from './components/TimelinePost';

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

  // Set posts on page load.
  useEffect( () => {
    if ( postsDemo.length > 1 ) {
      setPosts( postsDemo );
    }
  }, []);

  // Display All or Welcome.
  const currentView = typeof Object && posts.length > 0 ? <All timelinePosts={ posts }/> : <Welcome />;

  return (
    <Router>
      <Layout>
        <Switch>
          <Route
            exact
            path="/"
            render={() => currentView }
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
