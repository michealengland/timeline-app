import React, { useState } from 'react';
import { deletePost, deleteMediaFromStorage, deletePostFromTimeline } from '../utilities/delete';
import { Redirect } from 'react-router-dom';

const PostControls = ( props ) => {
	const {
		editPost,
		id,
		imageURL,
		timeline,
	} = props;

	const [redirect, setRedirect] = useState( false );

	const onEditPostClick = () => {
		console.log( 'EDIT POST CLICKED' );
		editPost(true)
	}

	const onDeleteClick = () => {
		console.log( 'DELETE POST CLICKED' );
		deletePost( id, timeline );
		deletePostFromTimeline( id,  timeline );

		if ( imageURL ) {
			deleteMediaFromStorage( imageURL );
		}

		setRedirect( true );
	}

	return (
		<nav className="post-controls">
			<button onClick={ onEditPostClick }>Edit</button>
			<button onClick={ onDeleteClick }>Delete</button>
			{ redirect === true && <Redirect to="/" /> }
		</nav>
	);
}

export default PostControls;