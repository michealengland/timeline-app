import React from 'react';

const PostControls = () => {

	const editPost = () => {
		console.log( 'EDIT POST CLICKED' );
	}

	const deletePost = () => {
		console.log( 'DELETE POST CLICKED' );
	}

	return (
		<nav>
			<button onClick={ editPost }>Edit</button>
			<button onClick={ deletePost }>Delete</button>
		</nav>
	);
}

export default PostControls;