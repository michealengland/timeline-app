import React from 'react';
import Welcome from '../views/Welcome';
import AddNewPost from '../layout/AddNewPost';

const NewPost = ( { postCount, uid } ) => (
	postCount > 0 ? <AddNewPost uid={ uid } /> : <Welcome uid={ uid } />
);

export default NewPost;