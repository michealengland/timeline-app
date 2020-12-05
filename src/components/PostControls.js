import React, { useState } from 'react';
import { deletePost, deleteMediaFromStorage, deletePostFromTimeline } from '../utilities/delete';
import { Redirect } from 'react-router-dom';
import EditPostButton from './EditPostButton'
import DeletePostButton from './DeletePostButton'

const PostControls = ( {
	editPost,
	id,
	imageURL,
	isEditing,
	timeline,
} ) => {
	const [redirect, setRedirect] = useState( false );

	/**
	 * Delete post.
	 */
	const handlePostDelete = () => {
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
			<DeletePostButton onDelete={handlePostDelete}/>
			{ redirect === true && <Redirect to="/" /> }
		</nav>
	);
}

export default PostControls;