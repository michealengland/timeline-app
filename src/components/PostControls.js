import React from 'react';
import { deletePost, deleteMediaFromStorage, deletePostFromTimeline } from '../utilities/delete';

const PostControls = (props) => {
	console.log('props', props);

	const editPost = () => {
		console.log( 'EDIT POST CLICKED' );
	}

	const onDeleteClick = () => {
		console.log( 'DELETE POST CLICKED' );
		deletePost( props.id, props.timeline );
		deletePostFromTimeline( props.id, props.timeline );
		deleteMediaFromStorage( props.imageURL );
	}

	return (
		<nav>
			<button onClick={ editPost }>Edit</button>
			<button onClick={ onDeleteClick }>Delete</button>
		</nav>
	);
}

export default PostControls;