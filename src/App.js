import React from 'react';
import Layout from './layout/Layout';
import All from './views/All';

function App() {
  return (
    <Layout>
      <p>Content will go here...</p>
      <All
        timelinePosts={ {
          post: {
            date: '12345',
            title: 'Example Post 1',
            image: {
              imageURL: "#",
              imageAlt: "Image Alt Value",
            }
          }
        } }
      />
    </Layout>
  );
}

export default App;
