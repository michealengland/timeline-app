import React from 'react';
import Layout from './layout/Layout';
import All from './views/All';

const postsDemo = {
  post1: {
    date: '12345',
    title: 'Example Post 1',
    image: {
      imageURL: "#",
      imageAlt: "Image Alt Value",
    }
  },
  post2: {
    date: '12345',
    title: 'Example Post 1',
    image: {
      imageURL: "#",
      imageAlt: "Image Alt Value",
    }
  },
  post3: {
    date: '12345',
    title: 'Example Post 1',
    image: {
      imageURL: "#",
      imageAlt: "Image Alt Value",
    }
  },
}

console.log( 'postsDemo', postsDemo );

function App() {
  return (
    <Layout>
      <p>Content will go here...</p>
      <All
        timelinePosts={ postsDemo }
      />
    </Layout>
  );
}

export default App;
