import React, { useState } from 'react';
import { deletePost, deleteMediaFromStorage, deletePostFromTimeline } from '../utilities/delete';
import { Redirect } from 'react-router-dom';
import EditPostButton from './EditPostButton'

const PostControls = ( props ) => {
	const {
		editPost,
		id,
		imageURL,
		isEditing,
		timeline,
	} = props;

	const [redirect, setRedirect] = useState( false );

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
			<EditPostButton isEditing={isEditing} editToggle={editPost} />
			<button onClick={ onDeleteClick }>Delete</button>
			{ redirect === true && <Redirect to="/" /> }
		</nav>
	);
}

export default PostControls;