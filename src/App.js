import React from 'react';
import Layout from './layout/Layout';
import All from './views/All';

const postsDemo = {
  post1: {
    category: 'Sundays',
    date: '03-07-2019',
    title: 'Maecenas egestas',
    image: {
      imageURL: "https://cdn2.thecatapi.com/images/bL3lrUi1A.jpg",
      imageAlt: "Image Alt Value",
    }
  },
  post2: {
    category: 'Bathroom Selfie',
    date: '04-04-2020',
    title: 'Proin faucibus arcu quis',
    image: {
      imageURL: "https://cdn2.thecatapi.com/images/IFXsxmXLm.jpg",
      imageAlt: "Image Alt Value",
    }
  },
  post3: {
    category: 'Chillin',
    date: '04-27-2020',
    title: 'Curabitur',
    image: {
      imageURL: "https://cdn2.thecatapi.com/images/IOqJ6RK7L.jpg",
      imageAlt: "Image Alt Value",
    }
  },
}

console.log( 'postsDemo', postsDemo );

function App() {
  return (
    <Layout>
      <All
        timelinePosts={ postsDemo }
      />
    </Layout>
  );
}

export default App;
